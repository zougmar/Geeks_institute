users = {
    "omar": "1234",
    "ali": "password",
    "sara": "qwerty"
}

logged_in = None

def run_cli():
    global logged_in
    while True:
        action = input("Enter command (login / exit): ").lower()

        if action == "exit":
            print("Goodbye!")
            break

        elif action == "login":
            username = input("Username: ")
            password = input("Password: ")

            if username in users and users[username] == password:
                logged_in = username
                print(f"✅ You are now logged in as {username}")
            else:
                print("❌ Invalid username or password.")
                signup_choice = input("User not found. Sign up? (yes/no): ").lower()
                if signup_choice == "yes":
                    signup()
                    
def signup():
    while True:
        new_username = input("Choose a username: ")
        if new_username in users:
            print("⚠️ Username already exists, try again.")
        else:
            break
    new_password = input("Choose a password: ")
    users[new_username] = new_password
    print(f"✅ User '{new_username}' signed up successfully!")
