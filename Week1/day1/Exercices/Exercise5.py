my_fav_numbers = {1, 2, 3, 4, 5, 6, 7, 8}
my_fav_numbers.add(11)
my_fav_numbers.add(12)

remove_item = list(my_fav_numbers)[-1]
my_fav_numbers.remove(remove_item)

print(remove_item)
print(my_fav_numbers)


riend_fav_numbers = {2,3,6,8,9,5,4,1}

concatenated = my_fav_numbers.union(riend_fav_numbers)
print(concatenated)