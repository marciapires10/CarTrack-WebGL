function track_3Model( ) {
	
	var track_3 = new emptyModelFeatures();
    
    track_3.name = "TRACK";

    track_3.vertices = [
        // TOP FACE
        -5,  0.26, -5,
		-5,  0.26, 5,
        -4,  0.26, 5,
        
		-4,  0.26, 5,
		-4,  0.26, -5,
        -5,  0.26, -5,

        -5,  0.26, -5,
		-5,  0.26, -4,
        -1,  0.26, -5,

        -1,  0.26, -5,
		-5,  0.26, -4,
        -1,  0.26, -4,

        -2,  0.26, -5,
		-2,  0.26, -2,
        -1,  0.26, -5,

        -1,  0.26, -5,
		-2,  0.26, -2,
        -1,  0.26, -2,

        -2,  0.26, -3,
		-2,  0.26, -2,
        2,  0.26, -3,

        2,  0.26, -3,
		-2,  0.26, -2,
        2,  0.26, -2,

        1,  0.26, -5,
		1,  0.26, -2,
        2,  0.26, -5,

        2,  0.26, -5,
		1,  0.26, -2,
        2,  0.26, -2,

        1,  0.26, -5,
		1,  0.26, -4,
        5,  0.26, -5,

        5,  0.26, -5,
		1,  0.26, -4,
        5,  0.26, -4,

        5,  0.26, -5,
		4,  0.26, -5,
        4,  0.26, 5,
        
		4,  0.26, 5,
		5,  0.26, 5,
        5,  0.26, -5,

        -5,  0.26, 4,
		-5,  0.26, 5,
        -1,  0.26, 4,

        -1,  0.26, 4,
		-5,  0.26, 5,
        -1,  0.26, 5,

        -2,  0.26, 2,
		-2,  0.26, 5,
        -1,  0.26, 2,

        -1,  0.26, 2,
		-2,  0.26, 5,
        -1,  0.26, 5,

        -2,  0.26, 2,
		-2,  0.26, 3,
        2,  0.26, 2,

        2,  0.26, 2,
		-2,  0.26, 3,
        2,  0.26, 3,

        1,  0.26, 2,
		1,  0.26, 5,
        2,  0.26, 2,

        2,  0.26, 2,
		1,  0.26, 5,
        2,  0.26, 5,

        1,  0.26, 4,
		1,  0.26, 5,
        5,  0.26, 4,

        5,  0.26, 4,
		1,  0.26, 5,
        5,  0.26, 5,
	];

    track_3.colors = [
        //ROAD
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
    ];
    track_3.start_colors = [
        //ROAD
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,

        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
        0.6, 0.6, 0.7,
    ];
	computeVertexNormals( track_3.vertices, track_3.normals );

	return track_3;
}