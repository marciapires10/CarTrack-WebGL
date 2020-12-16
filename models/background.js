function backgroundModel( ) {
	
	var background = new emptyModelFeatures();
	background.name = "background";
	background.vertices = [
        // FRONT
        -100, -100, -10,
        -100, 100, -10,
        100, 100, -10,
        
        100, 100, -10,
        100, -100, -10,
        -100, -100, -10,
	];

    background.colors = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ];
    background.start_colors = [
        // FRONT
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        // FRONT
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ];
	computeVertexNormals( background.vertices, background.normals );

	return background;
}