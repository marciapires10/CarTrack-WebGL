def get_square(x, y):
	for i in range(0, 4):
		print("{}, {}, {},\n{}, {}, {},\n{}, {}, {},\n{}, {}, {},\n{}, {}, {},\n{}, {}, {},\n".format(x,y,4, x, y-0.25,4, x+0.275, y-0.25, 4, x+0.275, y-0.25, 4, x+0.275, y, 4, x, y, 4))
		x += 0.275

x_start = 3.95
y_start = 3
z = 4
for i in range(0, 4):
	get_square(x_start, y_start)
	y_start -= 0.25


