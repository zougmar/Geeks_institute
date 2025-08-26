import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="auth_db",      
        user="postgres",        
        password="Omar1234",
        host="localhost",
        port="5432"
    )
