var car_speed = 0.0;
var prev_car_speed = 0.0;
var car_middle_point = [4.5, 0.0, 4.5];



function moveCar(road)
{
	if(road.current_direction() == "X_Neg")
	{
		// console.log("X_Neg")
		sceneModels[1].tx -= 0.01 * car_speed;
		car_middle_point[0] -= 0.1 * car_speed;
		if(car_middle_point[0] <= road.next_position()[0])
		{
			FlipCar(road.current_direction(), road.next_direction());
			road.advance();
		}  
	}
	else if(road.current_direction() == "X_Pos")
	{
		// console.log("X_Pos")
		sceneModels[1].tx += 0.01 * car_speed;
		car_middle_point[0] += 0.1 * car_speed;
		if(car_middle_point[0] >= road.next_position()[0]) 
		{
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
	// Aumentar velocidade
	if(car_speed != 4){
		car_speed += 0.25;
	}
	return car_speed;
}

function decrease_car_speed()
{
	// Diminuir velocidade
	if(car_speed != 0.25){
		car_speed -= 0.25;
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
	current_road.reset_road();
	car_speed = 0.0;
}

function start_race()
{
	car_middle_point = [4.5, 0.0, 4.5];
	sceneModels[1].tx = car_starting_pos[0];
	sceneModels[1].ty = car_starting_pos[1];
	sceneModels[1].tz = car_starting_pos[2];
	sceneModels[1].rotAngleYY = 0;
	current_road.reset_road();
	car_speed = 1.0;
}

function pause_race(){
	prev_car_speed = car_speed;
	car_speed = 0.0;
}

function cont_race(){
	car_speed = prev_car_speed;
}