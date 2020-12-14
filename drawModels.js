//// car model

var vertices = [

    // FRONT FACE
     
    -0.25, -0.25,  1,
     
     0.25, -0.25,  1,
     
     0.25,  0.25,  1,

     
     0.25,  0.25,  1,
     
    -0.25,  0.25,  1,
     
    -0.25, -0.25,  1,
    
    // TOP FACE
    
    -0.25,  0.25,  1,
     
     0.25,  0.25,  1,
     
     0.25,  0.25, -0.25,

     
     0.25,  0.25, -0.25,
     
    -0.25,  0.25, -0.25,
     
    -0.25,  0.25,  1,
    
    // BOTTOM FACE 
    
    -0.25, -0.25, -0.25,
     
     0.25, -0.25, -0.25,
     
     0.25, -0.25,  1,

     
     0.25, -0.25,  1,
     
    -0.25, -0.25,  1,
     
    -0.25, -0.25, -0.25,
    
    // LEFT FACE 
    
    -0.25,  0.25,  1,
     
    -0.25, -0.25, -0.25,

    -0.25, -0.25,  1,
     
     
    -0.25,  0.25,  1,
     
    -0.25,  0.25, -0.25,
     
    -0.25, -0.25, -0.25,
    
    // RIGHT FACE 
    
     0.25,  0.25, -0.25,
     
     0.25, -0.25,  1,

     0.25, -0.25, -0.25,
     
     
     0.25,  0.25, -0.25,
     
     0.25,  0.25,  1,
     
     0.25, -0.25,  1,
    
    // BACK FACE 
    
    -0.25,  0.25, -0.25,
     
     0.25, -0.25, -0.25,

    -0.25, -0.25, -0.25,
     
     
    -0.25,  0.25, -0.25,
     
     0.25,  0.25, -0.25,
     
     0.25, -0.25, -0.25,			 
];

var colors = [

    // FRONT FACE
        
    1.00,  0.00,  0.00,
    
    1.00,  0.00,  0.00,
    
    1.00,  0.00,  0.00,

        
    1.00,  1.00,  0.00,
    
    1.00,  1.00,  0.00,
    
    1.00,  1.00,  0.00,
                 
    // TOP FACE
        
    0.00,  0.00,  0.00,
    
    0.00,  0.00,  0.00,
    
    0.00,  0.00,  0.00,

        
    0.50,  0.50,  0.50,
    
    0.50,  0.50,  0.50,
    
    0.50,  0.50,  0.50,
                 
    // BOTTOM FACE
        
    0.00,  1.00,  0.00,
    
    0.00,  1.00,  0.00,
    
    0.00,  1.00,  0.00,

        
    0.00,  1.00,  1.00,
    
    0.00,  1.00,  1.00,
    
    0.00,  1.00,  1.00,
                 
    // LEFT FACE
        
    0.00,  0.00,  1.00,
    
    0.00,  0.00,  1.00,
    
    0.00,  0.00,  1.00,

        
    1.00,  0.00,  1.00,
    
    1.00,  0.00,  1.00,
    
    1.00,  0.00,  1.00,
                 
    // RIGHT FACE
        
    0.25,  0.50,  0.50,
    
    0.25,  0.50,  0.50,
    
    0.25,  0.50,  0.50,

        
    0.50,  0.25,  0.00,
    
    0.50,  0.25,  0.00,
    
    0.50,  0.25,  0.00,
                 
                 
    // BACK FACE
        
    0.25,  0.00,  0.75,
    
    0.25,  0.00,  0.75,
    
    0.25,  0.00,  0.75,

        
    0.50,  0.35,  0.35,
    
    0.50,  0.35,  0.35,
    
    0.50,  0.35,  0.35,			 			 
];

// cylinder model

var n_side = 12;

var points = [];
var dcolors = [];

var theta = [30, 30, 30];

var thetaLoc;

var cyl_vertices, cyl_colors;

function buildVertices(){
    var x, z;
    var angle = 0;
    var inc = Math.PI * 2.0 / n_side;

    cyl_vertices = new Array(n_side * 2);
    cyl_colors = new Array(n_side * 2);

    alt_colors = [[1.0, 0.5, 0.5, 1.0], [0.5, 1.0, 0.5, 1.0], [0.5, 0.5, 1.0, 1.0]];

    for( var i_side = 0; i_side < n_side; i_side++){
        x = 0.2 * Math.cos(angle);
        z = 0.2 * Math.sin(angle);


        cyl_vertices[i_side] = vec3(x, 0.5, z);
        cyl_colors[i_side] = alt_colors[i_side%3];

        cyl_vertices[i_side + n_side] = vec3(x, -0.5, z);
        cyl_colors[i_side + n_side] = alt_colors[i_side%3];

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

	console.log(newPoints);

	for(var i=0; i < dcolors.length; i++){
		for(var j=0; j < 3; j++){
			newColors.push(dcolors[i][j]);
		}
	}

}

// cone model
cone_vertices =[1.5, 0, 0, 
    -1.5, 1, 0, 
    -1.5, 0.809017,	0.587785,
    -1.5, 0.309017,	0.951057, 
    -1.5, -0.309017, 0.951057, 
    -1.5, -0.809017, 0.587785,
    -1.5, -1, 0, 
    -1.5, -0.809017, -0.587785,
    -1.5, -0.309017, -0.951057, 
    -1.5, 0.309017,	-0.951057, 
    -1.5, 0.809017,	-0.587785];