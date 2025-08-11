sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
print(sandwich_orders)

finished_sandwiches = []
for sandwich in sandwich_orders:
    finished_sandwiches.append(sandwich)
print(finished_sandwiches)

for sandwich in finished_sandwiches:
    print(f"I made your {sandwich.lower()}")