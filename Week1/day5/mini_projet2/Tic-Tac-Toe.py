def display_board(board):
    """Display the Tic Tac Toe board."""
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---+---+---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---+---+---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")

def player_input(player, board):
    """Ask the player for their move and validate it."""
    while True:
        try:
            pos = int(input(f"Player {player}, enter your move (1-9): ")) - 1
            if pos not in range(9):
                print("Invalid input. Enter a number from 1 to 9.")
            elif board[pos] != " ":
                print("This position is already taken. Choose another one.")
            else:
                return pos
        except ValueError:
            print("Invalid input. Enter a number from 1 to 9.")

def check_win(board, player):
    """Check if the player has won."""
    win_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columns
        [0, 4, 8], [2, 4, 6]              # diagonals
    ]
    for combo in win_combinations:
        if all(board[i] == player for i in combo):
            return True
    return False

def is_board_full(board):
    """Check if the board is full (tie)."""
    return all(space != " " for space in board)

def play():
    """Main function to play the game."""
    board = [" "] * 9
    current_player = "X"
    display_board(board)

    while True:
        move = player_input(current_player, board)
        board[move] = current_player
        display_board(board)

        if check_win(board, current_player):
            print(f"Congratulations! Player {current_player} wins!")
            break
        elif is_board_full(board):
            print("It's a tie!")
            break

        # Switch player
        current_player = "O" if current_player == "X" else "X"

if __name__ == "__main__":
    play()
