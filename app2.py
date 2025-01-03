from dotenv import load_dotenv
load_dotenv()
import warnings

warnings.filterwarnings("ignore")
import streamlit as st
import os
import psycopg2
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Load gemini and provide query
def get_gemini_response(question, prompt):
    model = genai.GenerativeModel('gemini-pro')
    content = prompt + "\n" + question
    response = model.generate_content(content)
    
    sql_query = response.text.split("Response:")[0].strip()
    if sql_query[:6] == "```sql":
        sql_query = sql_query[6:].strip()
    errors = ["```", "**"]
    for error in errors:
        sql_query = sql_query.replace(error, "")
    return sql_query.strip()

# Generate human-readable description
def get_human_readable_description(data, question):
    description_prompt = f"""
You are an expert AI assistant specializing in generating clear, accurate, and meaningful descriptions based on database query results.

### Context:
- An admin asks a question in **English**.
- The question is converted into a **SQL query** and executed on the **task_management_system** database.
- The **actual data** returned by the SQL query is provided below.

### Question:
{question}

### Data:
{data}

### Instructions:
1. **Focus on the Data Provided:** Generate insights and descriptions **strictly based on the given data.** Avoid assumptions, filler text, or fabricated information.
2. **Maintain Professionalism:** Write the response in a **professional and structured format.**
3. **Be Context-Aware:** If the data represents counts, lists, or statuses, format your response appropriately.
4. **Avoid Guesswork:** Do **not** add extra data, names, numbers, or details that are **not explicitly present in the given data.**

Your response should be accurate, structured, and contextually aligned.
"""
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(description_prompt)
    return response.text.strip()

# Retrieve query
def read_postgres_query(sql, db):
    conn = psycopg2.connect(db)
    cur = conn.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    conn.close()
    
    return rows

def sanitize_sql_query(query: str) -> str:
    return query.replace("```sql", "").replace("```", "").strip()

prompt = """
You are an expert in converting English questions into PostgreSQL queries and formatting the results into natural, human-readable sentences.

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
1. Always generate accurate PostgreSQL queries based on the input question.  
2. Ensure that SQL queries **do not** include unnecessary formatting, such as ```sql, ``` at the beginning or end.  
3. The SQL query should always be provided as plain text, without any Markdown symbols.  
4. Separate the **SQL query** from the **human-readable response**.  
5. Avoid using symbols like **, *, or extra punctuation in the query or response.

### Example:

**Question:** What are the distinct user names in the tasks table?  
**SQL Query:**  
SELECT DISTINCT user_name FROM tasks;  
**Response:**  
Here are the distinct user names from the tasks table.
"""

st.set_page_config(page_title="I can Retrieve Any SQL Query")
st.header("Gemini APP")

question = st.text_input("Input: ", key="input")
submit = st.button("Ask the question")

if submit:
    response = get_gemini_response(question, prompt)
    sanitized_query = sanitize_sql_query(response)
    st.write(f"Generated SQL Query: {sanitized_query}")

    db_conn_str = "dbname=task_management_system user=postgres password=1234 host=localhost"
    try:
        data = read_postgres_query(sanitized_query, db_conn_str)
        st.subheader("The response is:")
        if data:
            human_readable_description = get_human_readable_description(data, question)
            st.write(human_readable_description)
        else:
            st.write("No data found.")
    except Exception as e:
        st.error(f"An error occurred: {e}")
