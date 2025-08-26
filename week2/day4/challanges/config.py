import psycopg2

def connect():
    conn = psycopg2.connect(
        host="localhost",         # Your PostgreSQL host
        database="countries_db",  # The database you created
        user="postgres",          # Your PostgreSQL username
        password="Omar1234"  # Your PostgreSQL password
    )
    return conn
