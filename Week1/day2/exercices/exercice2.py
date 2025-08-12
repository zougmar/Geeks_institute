# Given family dictionary
family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}

total_cost = 0  # to keep track of total cost

for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    elif age > 12:
        price = 15
    
    print(f"{name.capitalize()} has to pay ${price}")
    total_cost += price

print(f"\nTotal family cost: ${total_cost}")



  # bonus task asking the user for their name and age
name = input("Enter your name: ")
age = int(input("Enter your age: "))

if age < 3:
    price = 0        
elif 3 <= age <= 12:
    price = 10
elif age > 12:   
    price = 15

print(f"{name.capitalize()} has to pay ${price}")