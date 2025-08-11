word = input("Enter a word: ")
result = word[0] if word else ""

for c in word[1:]:
    if c != result[-1]:
        result += c

print(result)
