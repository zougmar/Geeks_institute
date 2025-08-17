# rock-paper-scissors.py
from game import Game

def get_user_menu_choice():
    print("\nMenu:")
    print("(p) Play a new game")
    print("(s) Show scores")
    print("(q) Quit")
    choice = input("Enter your choice: ").lower().strip()
    if choice in ["p", "s", "q"]:
        return choice
    else:
        print("Invalid choice. Please try again.")
        return get_user_menu_choice()


def print_results(results):
    print("\nGame Results Summary:")
    print(f"Wins:   {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws:  {results['draw']}")
    print("\nThanks for playing Rock-Paper-Scissors!")


def main():
    results = {"win": 0, "loss": 0, "draw": 0}
    print("Welcome to Rock-Paper-Scissors!")

    while True:
        choice = get_user_menu_choice()

        if choice == "p":
            game = Game()
            game_result = game.play()

            if game_result == "win":
                results["win"] += 1
            elif game_result == "loss":
                results["loss"] += 1
            else:
                results["draw"] += 1

        elif choice == "s":
            print_results(results)

        elif choice == "q":
            print_results(results)
            break


if __name__ == "__main__":
    main()
