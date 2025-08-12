import random
def get_random_temp():
    return random.randint(-10, 40)
for _ in range(5):
 print(f"Random temperature: {get_random_temp()}°C")

 def main():
    store_temps = get_random_temp()
    print(f"The temperature right now is : {store_temps}°C")
