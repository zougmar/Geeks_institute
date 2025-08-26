from db_connection import get_connection
import bcrypt

def create_user(username, password):
    conn = get_connection()
    cur = conn.cursor()
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    try:
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", 
                    (username, hashed.decode('utf-8')))
        conn.commit()
        print(f"✅ User {username} created successfully.")
    except Exception as e:
        print("⚠️ Error:", e)
    finally:
        cur.close()
        conn.close()

def login(username, password):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE username = %s", (username,))
    result = cur.fetchone()
    cur.close()
    conn.close()

    if result:
        stored_password = result[0]
        if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
            print(f"✅ Logged in as {username}")
            return True
    print("❌ Invalid username or password")
    return False
