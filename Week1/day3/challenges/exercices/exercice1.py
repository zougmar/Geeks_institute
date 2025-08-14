class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
cat1 = Cat("Whiskers", 11)
cat2 = Cat("Mittens", 10)    
cat3 = Cat("Garfield", 7)

def oldest_cat():
    oldest = cat1
    for cat in [cat1,cat2,cat3]:
        if cat.age > oldest.age:
            oldest = cat
    return oldest
oldest = oldest_cat()
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")