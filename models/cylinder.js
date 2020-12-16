// cylinder model

var n_side = 12;

var points = [];
var dcolors = [];

var cyl_vertices, cyl_colors;

function buildVertices(){
    var x, z;
    var angle = 0;
    var inc = Math.PI * 2.0 / n_side;

    cyl_vertices = new Array(n_side * 2);
    //cyl_colors = new Array(n_side * 2);

    //alt_colors = [[1.0, 0.5, 0.5, 1.0], [0.5, 1.0, 0.5, 1.0], [0.5, 0.5, 1.0, 1.0]];

    for( var i_side = 0; i_side < n_side; i_side++){
        x = 0.15 * Math.cos(angle);
        z = 0.15 * Math.sin(angle);


        cyl_vertices[i_side] = vec3(x, 1.0, z);
        //cyl_colors[i_side] = alt_colors[i_side%3];

        cyl_vertices[i_side + n_side] = vec3(x, 0.0, z);
        //cyl_colors[i_side + n_side] = alt_colors[i_side%3];

        angle += inc;
    }
}

function colorCylinder(){

    buildVertices();

    for(var i_side = 0; i_side < n_side-1; i_side++){
        quad(i_side+1, i_side, n_side+i_side, n_side+i_side+1);
    }

    quad(0, n_side-1, 2*n_side-1, n_side);
}

var newPoints = [];
var newColors = [];

function quad(a, b, c, d){

    var indices = [a, b, c, a, c, d];

    var democolors = [ [0.3,0.2,0], [0.3,0.2,0], [0.3,0.2,0], [0.3,0.2,0], [0.3,0.2,0], [0.3,0.2,0] ];

    for(var i=0; i < indices.length; i++){
        points.push(cyl_vertices[indices[i]]);
        dcolors.push(democolors[i]);
	}

	for(var i=0; i < points.length; i++){
		for(var j=0; j < 3; j++){
			newPoints.push(points[i][j]);
		}
    }

	for(var i=0; i < dcolors.length; i++){
		for(var j=0; j < 3; j++){
			newColors.push(dcolors[i][j]);
		}
	}

}

function cylinderModel( ) {

    colorCylinder();
    
	var cylinder = new emptyModelFeatures();
    
    cylinder.name = "Cylinder";

    cylinder.vertices = newPoints;
    console.log("cyl");

    cylinder.colors = newColors;

    console.log(cylinder.colors);

	computeVertexNormals( cylinder.vertices, cylinder.normals );

	return cylinder;
}