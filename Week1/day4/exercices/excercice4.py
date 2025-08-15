class Family():
    def __init__(self, last_name, members):
        self.members = members
        self.last_name = last_name
    def born(self, **kwargs):
        self.members.append(kwargs)
        print(f"🎉 Congratulations to the {self.last_name} family for the birth of {kwargs.get('name')}!")
    
    def is_18(self, name):
         for member in self.members:
            if member['name'].lower() == name.lower():  
                return member['age'] >= 18
            print(f"No member named {name} found.")
            return None if member['age'] >= 18 else False
    def family_presentation(self):
        print(f"👨‍👩‍👧‍👦 The {self.last_name} Family:")
        for member in self.members:
            print(member)
    
members_list =     [
        {'name':'Michael','age':35,'gender':'Male','is_child':False},
        {'name':'Sarah','age':32,'gender':'Female','is_child':False}
    ]

# creating an instance of the Family class
my_family = Family('Smith', members_list)

#show presentation of the family
my_family.family_presentation()

my_family.born(name='John', age=5, gender='Male', is_child=True)


# Check if a member is 18
print(my_family.is_18('Michael'))  # Output: True
print(my_family.is_18('John'))  # Output: False
print(my_family.is_18('Alice'))  # Output: No member named Alice found.

my_family.family_presentation()  # Show updated family presentation