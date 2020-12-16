var roads = [];

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
            this.reset_road();
        }
    }

    reset_road()
    {
        this.current_index = 0;
    }
}

function initializeRoads()
{
    var road_1 = new Road("Road1", ["Z_Neg", "X_Neg", "Z_Pos", "X_Pos"], [[4.5, -4.5], [-4.5, -4.5], [-4.5, 4.5], [4.5, 4.5]]);
    var road_2 = new Road("Road2", ["Z_Neg", "X_Neg", "Z_Pos", "X_Pos", "Z_Neg", "X_Pos", "Z_Pos", "X_Pos"], [[4.5, -4.5], [-4.5, -4.5], [-4.5, 4.5], [-1.5, 4.5], [-1.5, 2.5], [1.5, 2.5], [1.5, 4.5], [4.5, 4.5]]);
    var road_3 = new Road("Road3", ["Z_Neg", "X_Neg", "Z_Pos", "X_Neg", "Z_Neg", "X_Neg", "Z_Pos", "X_Pos", "Z_Neg", "X_Pos", "Z_Pos", "X_Pos"], [[4.5, -4.5], [1.5, -4.5], [1.5, -2.5], [-1.5, -2.5], [-1.5, -4.5], [-4.5, -4.5], [-4.5, 4.5], [-1.5, 4.5], [-1.5, 2.5], [1.5, 2.5], [1.5, 4.5], [4.5, 4.5]]);
    roads.push(road_1);
    roads.push(road_2);
    roads.push(road_3);
    current_road = road_1;
}
