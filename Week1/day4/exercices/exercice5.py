from family import Family



class TheIncredibles:
    def __init__(self, last_name, members):
        self.family = Family(last_name, members)

    def add_member(self, **kwargs):
        self.family.born(**kwargs)

    def is_18(self, name):
        return self.family.is_18(name)

    def family_presentation(self):
        self.family.family_presentation()
        