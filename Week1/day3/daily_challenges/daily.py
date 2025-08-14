class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count

    def get_info(self):

        info = f"Farm Name: {self.name}\nAnimals:\n"
        for animal, count in self.animals.items():
            info += f"{animal}: {count}\n"
        return info

my_farm = Farm("Old MacDonald")

my_farm.add_animal("cow", 5)
my_farm.add_animal("pig", 3)
my_farm.add_animal("horse", 2)

print(my_farm.get_info())
