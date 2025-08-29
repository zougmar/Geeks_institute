import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv

load_dotenv()

def connect_to_db():
    try:
        conn = psycopg2.connect(
            host=os.getenv("PGHOST"),
            database=os.getenv("PGDATABASE"),
            user=os.getenv("PGUSER"),
            password=os.getenv("PGPASSWORD"),
            port=os.getenv("PGPORT"),
            sslmode="require",
            cursor_factory=psycopg2.extras.DictCursor
        )
        conn.autocommit = True
        return conn
    except Exception as e:
        print("Database connection failed:", e)
        return None
