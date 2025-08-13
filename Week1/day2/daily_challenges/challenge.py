#Ask a user for a word
#Make sure the letters are the keys.
#Make sure the letters are strings.
#Make sure the indexes are stored in a list, and those lists are values.
#Exemples
# “dodo” ➞ { “d”: [0, 2], “o”: [1, 3] }
# “froggy” ➞ { “f”: [0], “r”: [1], “o”: [2], “g”: [3, 4], “y”: [5] }
# “grapes” ➞ { “g”: [0], “r”: [1], “a”: [2], “p”: [3] }

def letter_indices(word):
    letter_dict = {}
    for index, letter in enumerate(word):
        if letter not in letter_dict:
            letter_dict[letter] = []
        letter_dict[letter].append(index)
    return letter_dict

print(letter_indices("dodo"))
print(letter_indices("froggy"))
print(letter_indices("grapes"))