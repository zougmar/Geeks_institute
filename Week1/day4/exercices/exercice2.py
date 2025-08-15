class Dog :
    def __init__(self, name, age, height) :
        self.name = name
        self.age = age
        self.height = height
    
    def bark(self) :
        return f"{self.name} is barking!"   
    def run_speed(self) : 
        return f"{self.name} runs at {self.height/self.age * 10} cm/s" 
    
    def fight(self, other_dog):
        if self.run_speed() > other_dog.run_speed():
            return f"{self.name} wins the fight against {other_dog.name}!"
        else:
            return f"{other_dog.name} wins the fight against {self.name}!"
    
dog1 = Dog("Rex", 5, 50)
dog2 = Dog("Teacup", 3, 20)
dog3 = Dog("Buddy", 4, 30)

print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))

