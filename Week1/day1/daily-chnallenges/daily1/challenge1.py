number = int(input("Enter a number: "))
lenth = int(input("Enter the lenth: "))

multiples = [number * i for i in range(1, lenth + 1)]
print(multiples)