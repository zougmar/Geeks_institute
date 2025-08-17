import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must specify either radius or diameter.")

    # Property for diameter
    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    # Compute area
    def area(self):
        return math.pi * (self.radius ** 2)

    # String representation (dunder method)
    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area():.2f})"

    # Addition of two circles
    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented

    # Comparison operators
    def __lt__(self, other):
        return self.radius < other.radius

    def __le__(self, other):
        return self.radius <= other.radius

    def __eq__(self, other):
        return self.radius == other.radius

    def __ne__(self, other):
        return self.radius != other.radius

    def __gt__(self, other):
        return self.radius > other.radius

    def __ge__(self, other):
        return self.radius >= other.radius


c1 = Circle(radius=5)
c2 = Circle(diameter=20)

print(c1)  
print(c2)  
# Add circles
c3 = c1 + c2
print(c3)  
# Compare circles
print(c1 > c2)   
print(c1 == c2) 

#Sorting
circles = [c3, c1, c2]
circles.sort()
for c in circles:
    print(c)
