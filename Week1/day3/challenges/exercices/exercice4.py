# Define Animal class
class Animal:
    def __init__(self, name):
        self.name = name

class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
    
    def add_animal(self, animal):
        if animal not in self.animals:
            self.animals.append(animal)
            print(f"{animal.name} has been added to the zoo.")
        else:
            print(f"{animal.name} is already in the zoo.")

    def get_animals(self):
        """Display all animals in the zoo"""
        if self.animals:
            print(f"Animals in {self.name}: {', '.join([animal.name for animal in self.animals])}")
        else:   
            print(f"{self.name} has no animals yet.")
    
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold.name} has been sold.")
        else:
            print(f"{animal_sold.name} is not in the zoo.")

    def sort_animals(self):
        sorted_animals = sorted(self.animals, key=lambda animal: animal.name.lower())
        group_animals = {}

        for animal in sorted_animals:
            first_letter = animal.name[0].upper()
            if first_letter not in group_animals:
                group_animals[first_letter] = [animal]
            else:
                group_animals[first_letter].append(animal)

        return group_animals
    
    def get_groups(self):
        groups = self.sort_animals()
        for letter, animals in groups.items():
            if len(animals) == 1:
                print(f"{letter}: {animals[0].name}")
            else:
                print(f"{letter}: {[a.name for a in animals]}")

# Animals (must use Animal, not animal)
dog1 = Animal("Dog")
dog2 = Animal("Doggy")
dog3 = Animal("Omar's Dog")
cat1 = Animal("Cat")
cat2 = Animal("Cougar")
cat3 = Animal("Cheetah")
monkey1 = Animal("Monkey1")
monkey2 = Animal("Monkey2")

# Create a zoo 
casablanca_zoo = Zoo("Casablanca Zoo")

casablanca_zoo.add_animal(dog1)
casablanca_zoo.add_animal(dog2)
casablanca_zoo.add_animal(dog3)
casablanca_zoo.add_animal(cat1)
casablanca_zoo.add_animal(cat2)
casablanca_zoo.add_animal(cat3)
casablanca_zoo.add_animal(monkey1)
casablanca_zoo.sell_animal(monkey2)

print("\nAnimal groups:")
casablanca_zoo.get_groups()
print("\nAll animals in the zoo:")
casablanca_zoo.get_animals()
print("\nSorting animals by name:")
sorted_groups = casablanca_zoo.sort_animals()
for letter, animals in sorted_groups.items():
    print(f"{letter}: {[animal.name for animal in animals]}")