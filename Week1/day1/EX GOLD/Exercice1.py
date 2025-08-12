month = int(input("Enter the month (1-12): "))
if month >= 3 and month <= 5:
    print("Spring!")
elif month >= 6 and month <= 8:
    print("Summer!")
elif month >= 9 and month <= 11:
    print("Autumn!")
elif month == 12 or month == 1 or month == 2:
    print("Winter!")
else:
    print("Invalid month!")
