import random
def get_random_temp():
    return random.randint(-10, 40)
for _ in range(5):
 print(f"Random temperature: {get_random_temp()}°C")

 def main():
    store_temps = get_random_temp()
    print(f"The temperature right now is : {store_temps}°C")
    if store_temps < 0:
        print("Brrr, that’s freezing! Wear some extra layers today")
    elif 0 <= store_temps <= 16:
        print("Quite chilly! Don’t forget your coat")
    elif 17 <= store_temps <= 23:
        print("the weather is nice. A light jacket should be enough.")
    elif 24 <= store_temps <= 32:
        print("The weather is warm. A t-shirt is fine.")
    elif 34 <= store_temps <= 40:
        print("It’s hot! Stay hydrated and wear sunscreen.")
main()