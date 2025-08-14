class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height
    
    def bark(self, name):
        return name + " Woof!"
    def jump(self, name, height):
        return self.name + " jumps " + str(self.height) + "cm high."

davids_dog = Dog("Rex", 50)
print(davids_dog.bark(davids_dog.name))
print(davids_dog.jump(davids_dog.name, davids_dog.height))

sarahs_dog = Dog("Teacup", 20)
print(sarahs_dog.bark(sarahs_dog.name))
print(sarahs_dog.jump(sarahs_dog.name, sarahs_dog.height))

if davids_dog.height > sarahs_dog.height:
    print(davids_dog.name + " is bigger than " + sarahs_dog.name)
else:
    print(sarahs_dog.name + " is bigger than " + davids_dog.name)