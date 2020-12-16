var car_speed = 0.0;
var prev_car_speed = 0.0;
var car_middle_point = [4.5, 0.0, 4.5];
var car_starting_pos = [0.45, 0.0, 0.45];

var car_colors = [
	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,

	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,


	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,

	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	


	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,

	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,

	//CAR
	0.9, 1, 1,
	0.9, 1, 1,
	0.9, 1, 1,
	0.9, 1, 1,
	0.9, 1, 1,
	0.9, 1, 1,

	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,

	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,

	//CAR
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,
	0.6, 0, 0.1,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	//CAR
	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,

	0, 0, 0.2,
	0, 0, 0.2,
	0, 0, 0.2,
];

function moveCar(road)
{
	if(road.current_direction() == "X_Neg")
	{
		sceneModels[1].tx -= 0.01 * car_speed;
		car_middle_point[0] -= 0.1 * car_speed;
		if(car_middle_point[0] <= road.next_position()[0])
		{
			sceneModels[1].tx = road.next_position()[0]/10;
			car_middle_point[0] = road.next_position()[0]
			FlipCar(road.current_direction(), road.next_direction());
			road.advance();
		}  
	}
	else if(road.current_direction() == "X_Pos")
	{
		sceneModels[1].tx += 0.01 * car_speed;
		car_middle_point[0] += 0.1 * car_speed;
		if(car_middle_point[0] >= road.next_position()[0]) 
		{
			sceneModels[1].tx = road.next_position()[0]/10;
			car_middle_point[0] = road.next_position()[0]
			FlipCar(road.current_direction(), road.next_direction());
			road.advance();
		} 
	}
	else if(road.current_direction() == "Z_Neg")
	{
		sceneModels[1].tz -= 0.01 * car_speed;
		car_middle_point[2] -= 0.1 * car_speed;
		if(car_middle_point[2] <= road.next_position()[1])
		{
			sceneModels[1].tz = road.next_position()[1]/10;
			car_middle_point[2] = road.next_position()[1]
			FlipCar(road.current_direction(), road.next_direction());
			road.advance();
		} 
	}
	else	// Z_Pos
	{
		sceneModels[1].tz += 0.01 * car_speed;
		car_middle_point[2] += 0.1 * car_speed;
		if(car_middle_point[2] >= road.next_position()[1])
		{
			sceneModels[1].tz = road.next_position()[1]/10;
			car_middle_point[2] = road.next_position()[1]
			FlipCar(road.current_direction(), road.next_direction());
			road.advance();
		} 
	}	
}

function FlipCar(prev_dir, new_dir)
{
	if(prev_dir == "Z_Neg" && new_dir == "X_Pos")
	{
		sceneModels[1].rotAngleYY -= 90; 
	}
	else if(prev_dir == "Z_Pos" && new_dir == "X_Neg")
	{
		sceneModels[1].rotAngleYY -= 90; 
	}
	else if(prev_dir == "X_Neg" && new_dir == "Z_Neg")
	{
		sceneModels[1].rotAngleYY -= 90; 
	}
	else if(prev_dir == "X_Pos" && new_dir == "Z_Pos")
	{
		sceneModels[1].rotAngleYY -= 90; 
	}
	else
	{
		sceneModels[1].rotAngleYY += 90; 
	}
}

function increase_car_speed()
{
	car_speed += 0.25;
	// Aumentar velocidade
	if(car_speed > 4){
		car_speed = 4;
	}
	return car_speed;
}

function decrease_car_speed()
{
	// Diminuir velocidade
	car_speed -= 0.25;
	if(car_speed < 0){
		car_speed = 0;
	}
	return car_speed;
}

function reset_car()
{
	car_middle_point = [4.5, 0.0, 4.5];
	sceneModels[1].tx = car_starting_pos[0];
	sceneModels[1].ty = car_starting_pos[1];
	sceneModels[1].tz = car_starting_pos[2];
	sceneModels[1].rotAngleYY = 0;
	current_road.reset_road(true);
	car_speed = 0.0;
}

function start_race()
{
	car_middle_point = [4.5, 0.0, 4.5];
	sceneModels[1].tx = car_starting_pos[0];
	sceneModels[1].ty = car_starting_pos[1];
	sceneModels[1].tz = car_starting_pos[2];
	sceneModels[1].rotAngleYY = 0;
	current_road.reset_road(true);
	car_speed = 1.0;
}

function pause_race(){
	prev_car_speed = car_speed;
	car_speed = 0.0;
}

function cont_race(){
	car_speed = prev_car_speed;
}

function change_car_color(color)
{
	color_arr = []
	if(color == 0)
	{
		color_arr.push(0);
		color_arr.push(0);
		color_arr.push(1);
	}
	else if(color == 1)
	{
		color_arr.push(0);
		color_arr.push(1);
		color_arr.push(0);
	}
	else if(color == 2)
	{
		color_arr.push(1);
		color_arr.push(1);
		color_arr.push(0);
	}
	else
	{
		color_arr.push(0.6);
		color_arr.push(0);
		color_arr.push(0.1);
	}

	for(var v=0; v < 180; v += 3){
		if(v >= 108 && v < 126){
			continue;
		}
		car_colors[v] = color_arr[0];
		car_colors[v+1] = color_arr[1];
		car_colors[v+2] = color_arr[2];
	}
	
}
