//////////////////////////////////////////////////////////////////////////////
//
//
//  References: www.learningwebgl.com + E. Angel examples
//
//  Adapted from J. Madeira - October 2015
//
//////////////////////////////////////////////////////////////////////////////


//----------------------------------------------------------------------------
//
// Global Variables
//

var gl = null; //WebGL context

var shaderProgram = null;

var triangleVertexPositionBuffer = null;

var triangleVertexColorBuffer = null;

var cylinderVertexPositionBuffer = null;

var cylinderVertexColorBuffer = null;

var coneVertexPositionBuffer = null;

var coneVertexColorBuffer = null;

var globalAngleYY = 0.0;

var globalTz = 0.0;

// The translation vector

var tx = 0.0;

var ty = 0.0;

var tz = 0.0;

// The rotation angles in degrees

var angleXX = 0.0;

var angleYY = 0.0;

var angleZZ = 0.0;

// The scaling factors

var sx = 0.5;

var sy = 0.5;

var sz = 0.5;

// NEW - GLOBAL Animation controls

var globalRotationYY_ON = 1;

var globalRotationYY_DIR = 1;

var globalRotationYY_SPEED = 1;

// NEW - Local Animation controls

var rotationXX_ON = 1;

var rotationXX_DIR = 1;

var rotationXX_SPEED = 1;
 
var rotationYY_ON = 1;

var rotationYY_DIR = 1;

var rotationYY_SPEED = 1;
 
var rotationZZ_ON = 1;

var rotationZZ_DIR = 1;

var rotationZZ_SPEED = 1;

// To allow choosing the way of drawing the model triangles

var primitiveType = null;

// To allow choosing the projection type

var projectionType = 0;

var vertices = [

	// FRONT FACE
	 
	-0.25, -0.25,  0.25,
	 
	 0.25, -0.25,  0.25,
	 
	 0.25,  0.25,  0.25,

	 
	 0.25,  0.25,  0.25,
	 
	-0.25,  0.25,  0.25,
	 
	-0.25, -0.25,  0.25,
	
	// TOP FACE
	
	-0.25,  0.25,  0.25,
	 
	 0.25,  0.25,  0.25,
	 
	 0.25,  0.25, -0.25,

	 
	 0.25,  0.25, -0.25,
	 
	-0.25,  0.25, -0.25,
	 
	-0.25,  0.25,  0.25,
	
	// BOTTOM FACE 
	
	-0.25, -0.25, -0.25,
	 
	 0.25, -0.25, -0.25,
	 
	 0.25, -0.25,  0.25,

	 
	 0.25, -0.25,  0.25,
	 
	-0.25, -0.25,  0.25,
	 
	-0.25, -0.25, -0.25,
	
	// LEFT FACE 
	
	-0.25,  0.25,  0.25,
	 
	-0.25, -0.25, -0.25,

	-0.25, -0.25,  0.25,
	 
	 
	-0.25,  0.25,  0.25,
	 
	-0.25,  0.25, -0.25,
	 
	-0.25, -0.25, -0.25,
	
	// RIGHT FACE 
	
	 0.25,  0.25, -0.25,
	 
	 0.25, -0.25,  0.25,

	 0.25, -0.25, -0.25,
	 
	 
	 0.25,  0.25, -0.25,
	 
	 0.25,  0.25,  0.25,
	 
	 0.25, -0.25,  0.25,
	
	// BACK FACE 
	
	-0.25,  0.25, -0.25,
	 
	 0.25, -0.25, -0.25,

	-0.25, -0.25, -0.25,
	 
	 
	-0.25,  0.25, -0.25,
	 
	 0.25,  0.25, -0.25,
	 
	 0.25, -0.25, -0.25,			 
];

// And their colour

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


// ------------------------------------------------------------------------------
// The WebGL code

// ------------------------------------------------------------------------------

// Rendering

// Handling the Vertex and the Color Buffers
function initBuffers() {

    // Coordinates
		
	triangleVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems = vertices.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			triangleVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
	
	// Colors
		
	triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	triangleVertexColorBuffer.itemSize = 3;
	triangleVertexColorBuffer.numItems = colors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			triangleVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);


	//initBuffersCylinder();
	//initBuffersCones();

}

function initBuffersCylinder(){
	// Coordinates
		
	cylinderVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newPoints), gl.STATIC_DRAW);
	cylinderVertexPositionBuffer.itemSize = 3;
	cylinderVertexPositionBuffer.numItems = newPoints.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			cylinderVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
	
	// Colors
		
	cylinderVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColors), gl.STATIC_DRAW);
	cylinderVertexColorBuffer.itemSize = 3;
	cylinderVertexColorBuffer.numItems = newColors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			cylinderVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
}

function initBuffersCones(){
	// Coordinates
		
	coneVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cone_vertices), gl.STATIC_DRAW);
	coneVertexPositionBuffer.itemSize = 3;
	coneVertexPositionBuffer.numItems = newPoints.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			cylinderVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
	
	// Colors
		
	cylinderVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColors), gl.STATIC_DRAW);
	cylinderVertexColorBuffer.itemSize = 3;
	cylinderVertexColorBuffer.numItems = newColors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			cylinderVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
}

// ---------------------------------------------------------------------------------

// // Drawing the model
function drawModel(modelVertexPosition, modelVertexColor,
					angleXX, angleYY, angleZZ, 
                    sx, sy, sz,
                    tx, ty, tz,
                    mvMatrix,
                    primitiveType) {
    mvMatrix = mult(mvMatrix, translationMatrix(tx, ty, tz));
    mvMatrix = mult(mvMatrix, rotationZZMatrix(angleZZ));
    mvMatrix = mult(mvMatrix, rotationYYMatrix(angleYY));
    mvMatrix = mult(mvMatrix, rotationXXMatrix(angleXX));
    mvMatrix = mult(mvMatrix, scalingMatrix(sx, sy, sz));

    // Passing the Model View Matrix to apply the current transformation
    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

    // Drawing the contents of the vertex buffer
	
	// primitiveType allows drawing as filled triangles / wireframe / vertices
	
	if( primitiveType == gl.LINE_LOOP ) {
		
		// To simulate wireframe drawing!
		
		// No faces are defined! There are no hidden lines!
		
		// Taking the vertices 3 by 3 and drawing a LINE_LOOP
		
		var i;
		
		for( i = 0; i < modelVertexPosition.numItems / 3; i++ ) {
		
			gl.drawArrays( primitiveType, 3 * i, 3 ); 
		}
	}	
	else {
				
		gl.drawArrays(primitiveType, 0, modelVertexPosition.numItems); 
			
	}	

}

function drawScene(){
    var pMatrix;
    var mvMatrix = mat4();

    // Clearing the frame-buffer and the depth-buffer
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    // Computing the Projection Matrix
	
	if( projectionType == 0 ) {
		
		// For now, the default orthogonal view volume
		
		pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );
		
		// Global transformation !!
		
		globalTz = 0;
		
		// TO BE DONE !
		
		// Allow the user to control the size of the view volume
	}
	else {	

		// A standard view volume.
		
		// Viewer is at (0,0,0)
		
		// Ensure that the model is "inside" the view volume
		
		pMatrix = perspective( 45, 1, 0.05, 15 );
		fColor;
		// Global transformation !!
		
		globalTz = -2.5;

		// TO BE DONE !
		
		// Allow the user to control the size of the view volume
	}
	
	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	// GLOBAL TRANSFORMATION FOR THE WHOLE SCENE
	
	mvMatrix = translationMatrix( 0, 0, globalTz );
	
	// Instantianting the current model
		
	drawModel( triangleVertexPositionBuffer, triangleVertexColorBuffer,
			   angleXX, angleYY, angleZZ, 
	           sx, sy, sz,
	           tx, ty, tz,
	           mvMatrix,
			   primitiveType );
			   
	drawModel( cylinderVertexPositionBuffer, cylinderVertexColorBuffer,
				angleXX, angleYY, angleZZ, 
				sx, sy, sz,
				tx, ty, tz,
				mvMatrix,
				primitiveType );
	
	drawModel( coneVertexPositionBuffer, coneVertexColorBuffer,
		angleXX, angleYY, angleZZ, 
		sx, sy, sz,
		tx, ty, tz,
		mvMatrix,
		primitiveType );
}

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate() {
	
	var timeNow = new Date().getTime();
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		
		// Global rotation
		
		if( globalRotationYY_ON ) {

			globalAngleYY += globalRotationYY_DIR * globalRotationYY_SPEED * (90 * elapsed) / 1000.0;
	    }

		// Local rotations
		
		if( rotationXX_ON ) {

			angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;
	    }

		if( rotationYY_ON ) {

			angleYY += rotationYY_DIR * rotationYY_SPEED * (90 * elapsed) / 1000.0;
	    }

		if( rotationZZ_ON ) {

			angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;
	    }
	}
	
	lastTime = timeNow;
}


// Timer
function tick(){

    requestAnimFrame(tick);
    drawScene();
	animate();
}

// User interaction
function outputInfos(){

}

function setEventListeners(){

}



// WebGL initialization

function initWebGL(canvas){
    try{
		
        // Create the WebGL context
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

		primitiveType = gl.TRIANGLES;
		
		gl.enable(gl.CULL_FACE);

    } catch(e) {
    }

    if (!gl) {
        alert("Could not initialise WebGL, sorry! :-(");
	}

}


function runWebGL() {
    var canvas = document.getElementById("my-canvas");

    initWebGL(canvas);

	shaderProgram = initShaders(gl);
	
	colorCylinder();

    setEventListeners();

    initBuffers();

    tick();

    outputInfos();

}