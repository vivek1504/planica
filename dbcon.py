import psycopg2
# connection  = psycopg2.connect(host='localhost',port='5432',database='Demo',
#                                user = 'postgres',password='1234')
from postgres import config
def connect():
    connection = None
    try:
        params = config()
        print("Connecting")
        connection = psycopg2.connect(**params)
        
        cursor = connection.cursor()
        print('Postgresql db: ')
        cursor.execute("SELECT version()")
        db_version = cursor.fetchone()
        print(db_version)
        cursor.close()
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        connection.close()
        print("Terminated")
if __name__ == "__main__":
     connect()