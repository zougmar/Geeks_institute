my_tuple = (1, 2, 3, 4)

temp_list = list(my_tuple)
temp_list.append(5)
my_tuple = tuple(temp_list)

print(my_tuple) 
