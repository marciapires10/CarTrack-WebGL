//////////////////////////////////////////////////////////////////////////////
// Adapted from J. Madeira - November 2017 + November 2018
//
// 
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
// Global Variables
//

var scenes = "WORLD";
var has_lights = false;
var light = 0;
var continue_light = true;
var car_starting_pos = [0.45, 0.0, 0.45];
var sceneModels = [];

var gl = null; // WebGL context

var shaderProgram = null;

var triangleVertexPositionBuffer = null;
	
var triangleVertexNormalBuffer = null;

var triangleVertexColorBuffer = null;	

// The GLOBAL transformation parameters

var globalAngleYY = 45;

var globalAngleXX = 45;

var globalAngleZZ = 30;

var globalTz = 0.0;

// GLOBAL Animation controls

var globalRotationYY_ON = 0;

var globalRotationYY_DIR = 1;

var globalRotationYY_SPEED = 1;

var globalRotationXX_DIR = 1;

var globalRotationXX_SPEED = 1;

var globalRotationZZ_DIR = 1;

var globalRotationZZ_SPEED = 1;

// To allow choosing the way of drawing the model triangles

var primitiveType = null;
 
// To allow choosing the projection type

var projectionType = 0;

// NEW --- The viewer position

// It has to be updated according to the projection type

var pos_Viewer = [ 0.0, 0.0, 0.0, 1.0 ];


//----------------------------------------------------------------------------
//
// NEW - To count the number of frames per second (fps)
//

var elapsedTime = 0;

var frameCount = 0;

var lastfpsTime = new Date().getTime();;


function countFrames() {
	
   var now = new Date().getTime();

   frameCount++;
   
   elapsedTime += (now - lastfpsTime);

   lastfpsTime = now;

   if(elapsedTime >= 1000) {
	   
       fps = frameCount;
       
       frameCount = 0;
       
       elapsedTime -= 1000;
	   
	   document.getElementById('fps').innerHTML = 'fps:' + fps;
   }
}


//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Vertex Coordinates and the Vertex Normal Vectors

function initBuffers( model ) {	
	
	// Vertex Coordinates
		
	triangleVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems =  model.vertices.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			triangleVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
	
	// Vertex Colors
	triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.colors), gl.STATIC_DRAW);
	triangleVertexColorBuffer.itemSize = 3;
	triangleVertexColorBuffer.numItems = model.colors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			triangleVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel( model,
					mvMatrix,
					primitiveType ) {

	// The the global model transformation is an input
	
	// Concatenate with the particular model transformations
	
	// Pay attention to transformation order !!
	
	mvMatrix = mult( mvMatrix, rotationZZMatrix( globalAngleZZ ) );
	mvMatrix = mult( mvMatrix, rotationYYMatrix( globalAngleYY ) );
	mvMatrix = mult( mvMatrix, rotationXXMatrix( globalAngleXX ) );

    
	mvMatrix = mult( mvMatrix, translationMatrix( model.tx, model.ty, model.tz ) );

	
	
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( model.rotAngleZZ ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( model.rotAngleYY ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( model.rotAngleXX ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( model.sx, model.sy, model.sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));
    
	// Associating the data to the vertex shader
	if(has_lights)
	{
		computeIllumination( mvMatrix, model );
	}
	
	// This can be done in a better way !!

	// Vertex Coordinates and Vertex Normal Vectors
	
	initBuffers(model);
	
	// Material properties
	
	gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_ambient"), 
		flatten(model.kAmbi) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_diffuse"),
        flatten(model.kDiff) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_specular"),
        flatten(model.kSpec) );

	gl.uniform1f( gl.getUniformLocation(shaderProgram, "shininess"), 
		model.nPhong );

    // // Light Sources
	
	var numLights = lightSources.length;
	
	gl.uniform1i( gl.getUniformLocation(shaderProgram, "numLights"), 
		numLights );

	// //Light Sources
	
	for(var i = 0; i < lightSources.length; i++ )
	{
		gl.uniform1i( gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].isOn"),
			lightSources[i].isOn );
    
		gl.uniform4fv( gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].position"),
			flatten(lightSources[i].getPosition()) );
    
		gl.uniform3fv( gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].intensities"),
			flatten(lightSources[i].getIntensity()) );
    }
        
	// Drawing 
	
	// primitiveType allows drawing as filled triangles / wireframe / vertices
	
	if( primitiveType == gl.LINE_LOOP ) {
		
		// To simulate wireframe drawing!
		
		// No faces are defined! There are no hidden lines!
		
		// Taking the vertices 3 by 3 and drawing a LINE_LOOP
		
		var i;
		
		for( i = 0; i < triangleVertexPositionBuffer.numItems / 3; i++ ) {
		
			gl.drawArrays( primitiveType, 3 * i, 3 ); 
		}
	}	
	else {
		gl.drawArrays(primitiveType, 0, triangleVertexPositionBuffer.numItems); 		
	}	
}

//----------------------------------------------------------------------------

function reset_light_sources()
{
	light = 0;
	for(var i = 0; i < sceneModels.length; i++)
	{
		for(var j = 0; j < sceneModels[i].colors.length; j++)
		{
			sceneModels[i].colors[j] = sceneModels[i].start_colors[j];
		}
	}
}
//  Drawing the 3D scene
function computeIllumination( mvMatrix, model ) {
	
	// return;// Comentar mais tarde
	// Phong Illumination Model

    // SMOOTH-SHADING 

    // Compute the illumination for every vertex

    // Iterate through the vertices
	
    for( var vertIndex = 0; vertIndex < model.vertices.length; vertIndex += 3 )
    {	
		// For every vertex
		
		// GET COORDINATES AND NORMAL VECTOR
		
		var auxP = model.vertices.slice( vertIndex, vertIndex + 3 );
		
		var auxN = model.normals.slice( vertIndex, vertIndex + 3 );

        // CONVERT TO HOMOGENEOUS COORDINATES

		auxP.push( 1.0 );
		
		auxN.push( 0.0 );
		
        // APPLY CURRENT TRANSFORMATION

        var pointP = multiplyPointByMatrix( mvMatrix, auxP );

        var vectorN = multiplyVectorByMatrix( mvMatrix, auxN );
        
        normalize( vectorN );

		// VIEWER POSITION
		
		var vectorV = vec3();
		
		if( projectionType == 0 ) {
		
			// Orthogonal 
			
			vectorV[2] = 1.0;
		}	
		else {
		    // Perspective
		    
		    // Viewer at ( 0, 0 , 0 )
		
			vectorV = symmetric( pointP );
		}
		
        normalize( vectorV );

	    // Compute the 3 components: AMBIENT, DIFFUSE and SPECULAR
	    
	    // FOR EACH LIGHT SOURCE
	    for(var l = 0; l < lightSources.length; l++ )
	    {
			if( lightSources[l].isOff() ) {
				continue;
			}
	        // INITIALIZE EACH COMPONENT, with the constant terms
	
		    var ambientTerm = vec3();
		
		    var diffuseTerm = vec3();
		
		    var specularTerm = vec3();
		
		    // For the current light source
		
		    ambient_Illumination = lightSources[l].getAmbIntensity();
		
		    int_Light_Source = lightSources[l].getIntensity();
		
		    pos_Light_Source = lightSources[l].getPosition();
		    
		    // Animating the light source, if defined
		    
		    var lightSourceMatrix = mat4();
		    
		    // COMPLETE THE CODE FOR THE OTHER ROTATION AXES
		    
		    if( lightSources[l].isRotYYOn() ) 
		    {
				lightSourceMatrix = mult( 
						lightSourceMatrix, 
						rotationYYMatrix( lightSources[l].getRotAngleYY() ) );
			}

			if( lightSources[l].isRotXXOn() ) 
		    {
				lightSourceMatrix = mult( 
						lightSourceMatrix, 
						rotationXXMatrix( lightSources[l].getRotAngleXX() ) );
			}

			if( lightSources[l].isRotZZOn() ) 
		    {
				lightSourceMatrix = mult( 
						lightSourceMatrix, 
						rotationZZMatrix( lightSources[l].getRotAngleZZ() ) );
			}
			
	        for( var i = 0; i < 3; i++ )
	        {
			    // AMBIENT ILLUMINATION --- Constant for every vertex
	   
			    ambientTerm[i] = ambient_Illumination[i] * model.kAmbi[i];
	
	            diffuseTerm[i] = int_Light_Source[i] * model.kDiff[i];
	
	            specularTerm[i] = int_Light_Source[i] * model.kSpec[i];
	        }
	    
	        // DIFFUSE ILLUMINATION
	        
	        var vectorL = vec4();
	
	        if( pos_Light_Source[3] == 0.0 )
	        {
	            // DIRECTIONAL Light Source
	            
	            vectorL = multiplyVectorByMatrix( 
							lightSourceMatrix,
							pos_Light_Source );
	        }
	        else
	        {
	            // POINT Light Source
	
	            // TO DO : apply the global transformation to the light source?
	
	            vectorL = multiplyPointByMatrix( 
							lightSourceMatrix,
							pos_Light_Source );
				
				for( var i = 0; i < 3; i++ )
	            {
	                vectorL[ i ] -= pointP[ i ];
	            }
	        }
	
			// Back to Euclidean coordinates
			
			vectorL = vectorL.slice(0,3);
			
	        normalize( vectorL );
	
	        var cosNL = dotProduct( vectorN, vectorL );
	
	        if( cosNL < 0.0 )
	        {
				// No direct illumination !!
				
				cosNL = 0.0;
	        }
	
	        // SEPCULAR ILLUMINATION 
	
	        var vectorH = add( vectorL, vectorV );
	
	        normalize( vectorH );
	
	        var cosNH = dotProduct( vectorN, vectorH );
	
			// No direct illumination or viewer not in the right direction
			
	        if( (cosNH < 0.0) || (cosNL <= 0.0) )
	        {
	            cosNH = 0.0;
	        }
	
	        // Compute the color values and store in the colors array
	        
	        var tempR = ambientTerm[0] + diffuseTerm[0] * cosNL + specularTerm[0] * Math.pow(cosNH, model.nPhong);
	        
	        var tempG = ambientTerm[1] + diffuseTerm[1] * cosNL + specularTerm[1] * Math.pow(cosNH, model.nPhong);
	        
			var tempB = ambientTerm[2] + diffuseTerm[2] * cosNL + specularTerm[2] * Math.pow(cosNH, model.nPhong);
	
			
			light += 1;
			
			if(light >= 50000)
			{
				light = 50000
				continue;
			}

			model.colors[vertIndex] += tempR;
	        
	        // Avoid exceeding 1.0
	        
			if( model.colors[vertIndex] > 1.0 ) {
				model.colors[vertIndex] = 1.0;
			}
	        
	        // Avoid exceeding 1.0
	        
			model.colors[vertIndex + 1] += tempG;
			
			if( model.colors[vertIndex + 1] > 1.0 ) {
				
				model.colors[vertIndex + 1] = 1.0;
			}
			
			model.colors[vertIndex + 2] += tempB;
	        
	        // Avoid exceeding 1.0
	        
			if( model.colors[vertIndex + 2] > 1.0 ) {
				model.colors[vertIndex + 2] = 1.0;
			}
			// lightSources[l].switchOff();
		}
			
	}
}

function drawScene() {
	
	var pMatrix;
	
	var mvMatrix = mat4();
	
	// Clearing the frame-buffer and the depth-buffer
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// Computing the Projection Matrix
	
	if( projectionType == 0 ) {
		
		// For now, the default orthogonal view volume
		
		pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );
		
		// Global transformation !!
		
		globalTz = 0.0;
		
		// NEW --- The viewer is on the ZZ axis at an indefinite distance
		
		pos_Viewer[0] = pos_Viewer[1] = pos_Viewer[3] = 0.0;
		
		pos_Viewer[2] = 1.0;  
		
	}
	else {	

		
		pMatrix = perspective( 45, 1.5, 0.05, 15 );
		
		// Global transformation !!
		
		globalTz = -2.5;

		
		pos_Viewer[0] = pos_Viewer[1] = pos_Viewer[2] = 0.0;
		
		pos_Viewer[3] = 1.0;  
		
	}
	
	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	
	
	gl.uniform4fv( gl.getUniformLocation(shaderProgram, "viewerPosition"),
        flatten(pos_Viewer) );
	
	// GLOBAL TRANSFORMATION FOR THE WHOLE SCENE
	
	mvMatrix = translationMatrix( 0, 0, globalTz );
	
	// NEW - Updating the position of the light sources, if required
	
	// FOR EACH LIGHT SOURCE
	    
	for(var i = 0; i < lightSources.length; i++ )
	{
		// Animating the light source, if defined
		    
		var lightSourceMatrix = mat4();

		if( !lightSources[i].isOff() ) {
				

			if( lightSources[i].isRotYYOn() ) 
			{
				lightSourceMatrix = mult( 
						lightSourceMatrix, 
						rotationYYMatrix( lightSources[i].getRotAngleYY() ) );
			}

			if( lightSources[i].isRotXXOn() ) 
			{
				lightSourceMatrix = mult( 
						lightSourceMatrix, 
						rotationXXMatrix( lightSources[i].getRotAngleXX() ) );
			}

			if( lightSources[i].isRotZZOn() ) 
			{
				lightSourceMatrix = mult( 
						lightSourceMatrix, 
						rotationZZMatrix( lightSources[i].getRotAngleZZ() ) );
			}
		}
		
	
		var lsmUniform = gl.getUniformLocation(shaderProgram, "allLights["+ String(i) + "].lightSourceMatrix");
	
		gl.uniformMatrix4fv(lsmUniform, false, new Float32Array(flatten(lightSourceMatrix)));
	}
			
	// Instantianting all scene models
	
	for(var i = 0; i < sceneModels.length; i++ )
	{ 
		
		drawModel( sceneModels[i],
			   mvMatrix,
	           primitiveType );
	}
	           
	
	countFrames();
}

function setDay()
{
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	lightSources[0].setIntensity( 0.8, 0.0, 0.0 );
	lightSources[0].setAmbIntensity( 0.1, 0.0, 0.0 );
	reset_light_sources();
}

function setNight()
{
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	lightSources[0].setIntensity( 0.1, 0.0, 0.1 );
	lightSources[0].setAmbIntensity( -0.2, 0.0, -0.1 );
	reset_light_sources();
}
//----------------------------------------------------------------------------
//
//  NEW --- Animation
//

// Animation --- Updating transformation parameters
var lastTime = 0;

function animate() {
	
	var timeNow = new Date().getTime();
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		
	}
	lastTime = timeNow;
}


//----------------------------------------------------------------------------

// Timer

function tick() {
	
	requestAnimFrame(tick);
	if(scenes == "WORLD")
	{
		moveCar(current_road);
	}
	drawScene();
	animate();
}

//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos(){
    
}

//----------------------------------------------------------------------------
function updateSpeed(){
	document.getElementById("speed_value").innerHTML = car_speed;
}


function resetTrack(){
	track = document.getElementById("tracks");
	track.selectedIndex = 0;
	current_road = roads[0];
}

function resetAll(){
	globalAngleXX = 45;
	globalAngleYY = 45;
	globalAngleZZ = 30;
	scenes = "WORLD";
	init_models();
	reset_car();
	updateSpeed();
	resetTrack();
}

function setEventListeners(){
	var show_world = document.getElementById("show_world");
	var show_car = document.getElementById("show_car");
	var div_world = document.getElementById("div_world");
	var div_car = document.getElementById("div_car");
	var light_on = document.getElementById("turnOnLights");
	var light_off = document.getElementById("turnOffLights");

	updateSpeed();
	div_car.style.visibility = 'hidden';
	div_car.style.height = '0px';
	
	light_on.addEventListener("click", function(){
		has_lights = true;
	})
	light_off.addEventListener("click", function(){
		has_lights = false;
		reset_light_sources();
	})
	show_car.addEventListener("click", function(){
		scenes = "CAR";
		init_models();

		div_world.style.visibility = 'hidden';
		div_car.style.visibility = 'visible';

	});


	show_world.addEventListener("click", function(){
		resetAll();

		div_world.style.visibility = 'visible';
		div_car.style.visibility = 'hidden';
		div_car.style.height = '0px';

	});

	var blue = document.getElementById("blue");
	var green = document.getElementById("green");
	var yellow = document.getElementById("yellow");
	var red = document.getElementById("red");

	blue.addEventListener("click", function(){
		change_car_color(0)});

	green.addEventListener("click", function(){
		change_car_color(1)
	});

	yellow.addEventListener("click", function(){
		change_car_color(2)
	});

	red.addEventListener("click", function(){
		change_car_color(3)
	});


	var reset_race = document.getElementById("reset_race");
	reset_race.addEventListener("click", function(){
		reset_car();
		updateSpeed();
	});

	var start_car = document.getElementById("start_car");
	start_car.addEventListener("click", function(){
		start_race();
		updateSpeed();
	});

	var pause_car = document.getElementById("pause_car");
	pause_car.addEventListener("click", function(){
		pause_race();
		updateSpeed();
	});

	var cont_car = document.getElementById("cont_car");
	cont_car.addEventListener("click", function(){
		cont_race();
		updateSpeed();
	});

	var speed_dec = document.getElementById("decrease_speed");
	var speed_inc = document.getElementById("increase_speed");

	speed_dec.addEventListener("click", function(){
		decrease_car_speed();
		updateSpeed();
	});

	speed_inc.addEventListener("click", function(){
		increase_car_speed();
		updateSpeed();
	});

	var laps = document.getElementById("n_lap");
	
	
	var r_laps = document.getElementById("send_lap");

	r_laps.addEventListener("click", function(){
		if(laps.value == "" || laps.value < 1){
			alert("You have to define a valid number of laps");
		} 
		else{
			defineLap(laps.value);
			start_race();
			laps.value = "";
		}
	});


	document.addEventListener("keydown", function(event){
		var key = event.keyCode;
		switch(key){
			case 39 :
				globalAngleXX += 10;
			break;

			case 37 :
				globalAngleXX -= 10;
			break;

			case 38 :
				globalAngleZZ += 10;
			break;

			case 40 :
				globalAngleZZ -= 10;
			break;

			case 81 :
				globalAngleYY += 10;
			break;

			case 65 :
				globalAngleYY -= 10;
			break;

			case 68 :
				setDay();
			break;

			case 78 :
				setNight();
			break;
		}	
	});
	
    // Dropdown list
	
	var projection = document.getElementById("projection-selection");
	
	projection.addEventListener("click", function(){
				
		// Getting the selection
		
		var p = projection.selectedIndex;
				
		switch(p){
			
			case 0 : projectionType = 0;
				break;
			
			case 1 : projectionType = 1;
				break;
		}  	
	});       

	// Dropdown list
	
	var list = document.getElementById("tracks");
	
	list.addEventListener("click", function(){
				
		// Getting the selection
		
		var mode = list.selectedIndex;
				
		switch(mode){
			
			case 0 :
			{	
				current_road.reset_road(true);
				sceneModels[2] = new track_1Model();
				current_road = roads[0];
				reset_car();
				//setDay();
				break;
			} 
			case 1 : 
			{
				current_road.reset_road(true);
				sceneModels[2] = new track_2Model();
				current_road = roads[1];
				reset_car();
				//setNight();
				break;
			}
			
			case 2 :
			{
				current_road.reset_road(true);
				sceneModels[2] = new track_3Model();
				current_road = roads[2];
				reset_car();
				break;
			}
			case 3 :
			{
				current_road.reset_road(true);
				sceneModels[2] = new track_4Model();
				current_road = roads[3];
				reset_car();
				break;
			}
			
		}
	});     

	reset_all = document.getElementById("reset_all");

	reset_all.addEventListener("click", function(){
		resetAll();

	});

}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function init_models()
{
	sceneModels = [];
	if(scenes == "WORLD"){
		
		sceneModels.push( new worldModel() );
		sceneModels.push( new carModel() );
		sceneModels[1].colors = car_colors;
		sceneModels[1].start_colors = car_colors;
		sceneModels[1].tx = car_starting_pos[0];
		sceneModels[1].ty = car_starting_pos[1];
		sceneModels[1].tz = car_starting_pos[2];
		sceneModels.push( new track_1Model() );
		// Piramid tree
		sceneModels.push( new cylinderModel());
		sceneModels[3].tx = 0.35;
		sceneModels[3].ty = 0.08;
		sceneModels[3].tz = -0.2;
		sceneModels.push( new treetop_pirModel());
		sceneModels[4].tx = 0.35;
		sceneModels[4].ty = 0.20;
		sceneModels[4].tz = -0.2;

		// Quad tree
		sceneModels.push( new cylinderModel());
		sceneModels[5].tx = -0.3;
		sceneModels[5].ty = 0.05;
		sceneModels[5].tz = 0.35;
		sceneModels[5].sx = 0.05;
		sceneModels[5].sy = 0.05;
		sceneModels[5].sz = 0.05;
		sceneModels.push( new treetop_quadModel() );
		sceneModels[6].tx = -0.3;
		sceneModels[6].ty = 0.075;
		sceneModels[6].tz = 0.35;
		sceneModels[6].sx = 0.05;
		sceneModels[6].sy = 0.05;
		sceneModels[6].sz = 0.05;

		// Mini Quad Tree
		sceneModels.push( new cylinderModel());
		sceneModels[7].tx = -0.55;
		sceneModels[7].ty = 0.07;
		sceneModels[7].tz = -0.55;
		sceneModels.push( new treetop_quadModel() );
		sceneModels[8].tx = -0.55;
		sceneModels[8].ty = 0.10;
		sceneModels[8].tz = -0.55;

		sceneModels.push( new flagmarkModel() );
	}
	else {
		sceneModels.push( new carModel() );
		sceneModels[0].colors = car_colors;
		sceneModels[0].start_colors = car_colors;
		sceneModels[0].tx = -0.2;
		sceneModels[0].ty = -0.5;
		sceneModels[0].tz = 0.0;
		sceneModels[0].sx = 1.5;
		sceneModels[0].sy = 1.5;
		sceneModels[0].sz = 1.5;
		sceneModels[0].rotAngleYY += 180;
	}
}

function initWebGL( canvas ) {
	try {
		
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
		
		primitiveType = gl.TRIANGLES;
		
		gl.enable( gl.DEPTH_TEST );
        
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	init_models();
	initializeRoads();
	var canvas = document.getElementById("my-canvas");
	initWebGL( canvas );
	resetTrack();
	shaderProgram = initShaders( gl );
	setEventListeners();
	setDay();
	tick();
}


