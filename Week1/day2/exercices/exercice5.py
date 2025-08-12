import random

def compare_numbers(user_number):

    if 1 <= user_number <= 100:
        random_number = random.randint(1, 100)
        if user_number == random_number:
            print("Success! You guessed the correct number.")
        else:
            print(f"Fail! Your number was {user_number} and the random number was {random_number}.")
    else:
        print("Error: Please provide a number between 1 and 100.")


compare_numbers(25)
