from dog import Dog
import random
class PetDog(Dog):
    def __init__(self, name, age, height, trained = False):
        super().__init__(name, age, height)
        self.trained = trained
    def train(self):
        self.trained = True
        return f".{self.bark()} {self.name} is now trained!"


# #play: takes a parameter which value is a few names 
# of other Dog instances (use *args). The method should print the 
# following string: “dog_names all play together”.
    def play(self, *args):
        names = ', '.join([self.name for dog in args])
        return f"{names} all play together."
    
    def do_a_trick(self):
        if self.trained == True:
            tricks = [f"{self.name} does a barrel roll", f"{self.name} stands on his back legs", f"{self.name} shakes hands", f"{self.name} plays dead"]
            return f"{self.name} {random.choice(tricks)}!"
        else:
            return f"{self.name} is not trained to do tricks yet."
dog1 = PetDog("Rex", 5, 50)

t1 = PetDog("Teacup", 3, 20, True)
print(t1.do_a_trick())