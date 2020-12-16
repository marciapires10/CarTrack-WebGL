var roads = [];
var current_lap = 0;
var current_road;
var has_lap_limit = false;
var lap_limit = 4;

class Road{
    constructor(name, directions, positions)
    {
        this.current_index = 0;
        this.name = name;
        this.directions = directions;
        this.positions = positions;
    }
    
    current_direction()
    {
        return this.directions[this.current_index];
    }

    next_direction()
    {
        if(this.current_index == this.directions.length)
        {
            return this.directions[0];
        }
        else
        {
            return this.directions[this.current_index + 1];
        }
    }

    next_position()
    {
        return this.positions[this.current_index];
    }

    
    advance()
    {
        this.current_index += 1;
        if(this.current_index >= this.directions.length)
        {
            this.reset_road(false);
        }
    }

    reset_road(reset_race)
    {
        if(reset_race)
        {
            current_lap = 0;
        }
        else
        {
            current_lap += 1;
        }
        this.current_index = 0;
        updateLap();
    }
}

function updateLap()
{
    document.getElementById("lap_value").innerHTML = current_lap;
    if(has_lap_limit)
    {
        if(current_lap >= lap_limit)
        {
            has_lap_limit = false;
            reset_car();
        }
    }
}

function defineLap(laps){
    lap_limit = laps;
    has_lap_limit = true;
}

function initializeRoads()
{
    var road_1 = new Road("Road1", ["Z_Neg", "X_Neg", "Z_Pos", "X_Pos"], [[4.5, -4.5], [-4.5, -4.5], [-4.5, 4.5], [4.5, 4.5]]);
    var road_2 = new Road("Road2", ["Z_Neg", "X_Neg", "Z_Pos", "X_Pos", "Z_Neg", "X_Pos", "Z_Pos", "X_Pos"], [[4.5, -4.5], [-4.5, -4.5], [-4.5, 4.5], [-1.5, 4.5], [-1.5, 2.5], [1.5, 2.5], [1.5, 4.5], [4.5, 4.5]]);
    var road_3 = new Road("Road3", ["Z_Neg", "X_Neg", "Z_Pos", "X_Neg", "Z_Neg", "X_Neg", "Z_Pos", "X_Pos", "Z_Neg", "X_Pos", "Z_Pos", "X_Pos"], [[4.5, -4.5], [1.5, -4.5], [1.5, -2.5], [-1.5, -2.5], [-1.5, -4.5], [-4.5, -4.5], [-4.5, 4.5], [-1.5, 4.5], [-1.5, 2.5], [1.5, 2.5], [1.5, 4.5], [4.5, 4.5]]);
    var road_4 = new Road("Road4", ["Z_Neg", "X_Neg", "Z_Pos", "X_Neg", "Z_Neg", "X_Neg", "Z_Pos", "X_Neg", "Z_Pos", "X_Pos"], [[4.5, -4.5], [2.5, -4.5], [2.5, 2.5], [-0.5, 2.5], [-0.5, -4.5], [-2.5, -4.5], [-2.5, 2.5], [-4.5, 2.5], [-4.5, 4.5], [4.5, 4.5]]);
    roads.push(road_1);
    roads.push(road_2);
    roads.push(road_3);
    roads.push(road_4);
    current_road = road_1;
    current_lap = 0;
    document.getElementById("lap_value").innerHTML = current_lap;
}
