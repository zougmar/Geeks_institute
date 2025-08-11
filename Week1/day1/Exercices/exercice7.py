basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")

basket.remove("Blueberries")
basket.append("kiwi")
print(basket)
basket.insert(0, "Apples")
print(basket)
count_apples = basket.count("Apples")
print(count_apples)
basket.clear()
print(basket)