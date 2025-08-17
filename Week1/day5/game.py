# game.py
import random

class Game:
    def __init__(self):
        self.items = ["rock", "paper", "scissors"]

    def get_user_item(self):
        while True:
            user_item = input("Select (r)ock, (p)aper, or (s)cissors: ").lower().strip()

            # Allow shortcuts
            if user_item in ["r", "rock"]:
                return "rock"
            elif user_item in ["p", "paper"]:
                return "paper"
            elif user_item in ["s", "scissors"]:
                return "scissors"
            else:
                print("Invalid input. Please try again.")

    def get_computer_item(self):
        return random.choice(self.items)

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (user_item == "rock" and computer_item == "scissors") or \
             (user_item == "scissors" and computer_item == "paper") or \
             (user_item == "paper" and computer_item == "rock"):
            return "win"
        else:
            return "loss"

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        if result == "win":
            print(f"You selected {user_item}. The computer selected {computer_item}. 🎉 You win!")
        elif result == "loss":
            print(f"You selected {user_item}. The computer selected {computer_item}. 😢 You lose!")
        else:
            print(f"You selected {user_item}. The computer selected {computer_item}. 🤝 It's a draw!")

        return result
