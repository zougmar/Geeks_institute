from family import Family

class TheIncredibles(Family):
   
    def usepower(self, name):
        for member in self.members:
            if member['name'].lower() == name.lower():
                if member['age'] >= 18:
                    print(f"{member['name']}'s power: {member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 years old!")
                return
        print(f"No member named {name} found.")


    def incredible_presentation(self):
        print("💥 Here is our powerful family 💥")
        super().family_presentation()

# Creating an instance of TheIncredibles class
incredible_members =     [
        {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
        {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
    ]

incredible = TheIncredibles('Incredibles', incredible_members)

# Show presentation of the incredible family
incredible.incredible_presentation()

incredible.usepower('MikeFly') 

incredible.born(
    name="Baby Jack", age=1, gender="Male", is_child=True,
    power="Unknown Power", incredible_name="BabyJack"
)
incredible.incredible_presentation()  # Show updated family presentation