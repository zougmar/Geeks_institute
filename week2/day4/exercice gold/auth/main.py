# main.py

from auth_cli import run_cli       # Part 1 & 2
# from auth_db import login, create_user   # Part 3 if using DB

if __name__ == "__main__":
    # For dictionary version:
    run_cli()

    # For database version (uncomment if you want DB flow):
    """
    while True:
        action = input("Enter command (login / signup / exit): ").lower()
        if action == "exit":
            print("Goodbye!")
            break
        elif action == "signup":
            username = input("Choose a username: ")
            password = input("Choose a password: ")
            create_user(username, password)
        elif action == "login":
            username = input("Username: ")
            password = input("Password: ")
            login(username, password)
    """
