from dotenv import load_dotenv
load_dotenv()
import warnings

warnings.filterwarnings("ignore")
import streamlit as st
import os
import psycopg2

import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


# Load Gemini to Generate SQL Query
def get_gemini_response(question, prompt):
    model = genai.GenerativeModel('gemini-pro')
    content = prompt + "\n" + question
    response = model.generate_content(content)
    
    # Extract SQL Query
    sql_query = response.text.split("Response:")[0].strip()
    sql_query = sql_query.split(";")[0]  # Stop at the first semicolon
    
    if sql_query[:6] == "```sql":
        sql_query = sql_query[6:].strip()
    errors = ["```", "**"]
    for error in errors:
        sql_query = sql_query.replace(error, "")
    return sql_query.strip()


# Generate Human-Readable Description
def get_human_readable_description(data, description_prompt, question):
    model = genai.GenerativeModel('gemini-pro')
    content = f"{description_prompt}\nQuestion: {question}\nData: {data}"
    response = model.generate_content(content)
    return response.text.strip()


# Execute SQL Query
def read_postgres_query(sql, db):
    conn = psycopg2.connect(db)
    cur = conn.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    conn.close()
    return rows


# Sanitize SQL Query
def sanitize_sql_query(query: str) -> str:
    return query.replace("```sql", "").replace("```", "").strip()


# SQL Prompt
sql_prompt = """
You are an expert in converting English questions into PostgreSQL queries.

### Database Details:
- Database: task_management_system  
- Tables: 
1. EventManager
2. Vendor
3. Client
4. Event
5. TeamMember
6. Task
7. SubTask
8. SubTaskRequest
9. Comments
10. Messages

### Instructions:
1. Always generate **only valid PostgreSQL queries** based on the input question.  
2. **Never include human-readable text or explanation in the SQL query.**  
3. Ensure the SQL query ends with a semicolon and has no Markdown formatting.

### Example:

**Question:** How many tasks are in the Task table?  
**SQL Query:** SELECT COUNT(*) AS total_tasks FROM Task;
"""

# Description Prompt
description_prompt = """
You are an AI designed to generate **accurate human-readable descriptions** from SQL query results.

### Instructions:
1. Provide a **clear and professional summary** strictly based on the provided data.  
2. Avoid assumptions or adding unrelated information.  
3. Format the response to match the original question context.
"""

# Streamlit Interface
st.set_page_config(page_title="AI SQL Query & Description Generator")
st.header("Gemini APP")

question = st.text_input("Input: ", key="input")
submit = st.button("Ask the question")

if submit:
    # Generate SQL Query
    sql_response = get_gemini_response(question, sql_prompt)
    sanitized_query = sanitize_sql_query(sql_response)
    st.write(f"**Generated SQL Query:**\n{sanitized_query}")

    db_conn_str = "dbname=task_management_system user=postgres password=1234 host=localhost"
    try:
        # Fetch Data from Database
        data = read_postgres_query(sanitized_query, db_conn_str)
        st.subheader("**SQL Query Result:**")
        if data:
            for row in data:
                st.write(row)
            
            # Generate Human-Readable Description
            description = get_human_readable_description(data, description_prompt, question)
            st.subheader("**Human-Readable Response:**")
            st.write(description)
        else:
            st.write("No data found.")
    except Exception as e:
        st.error(f"An error occurred: {e}")
