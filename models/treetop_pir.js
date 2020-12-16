// treetop_pir model

function treetop_pirModel( ) {
	var treetop_pir = new emptyModelFeatures();
    
    treetop_pir.name = "Treetop_Pir";

    treetop_pir.vertices = [
        // Front face
        0.0,  0.8,  0.0,
        -0.8, -0.8,  0.8,
        0.8, -0.8,  0.8,
        // Right face
        0.0,  0.8,  0.0,
        0.8, -0.8,  0.8,
        0.8, -0.8, -0.8,
        // Back face
        0.0,  0.8,  0.0,
        0.8, -0.8, -0.8,
        -0.8, -0.8, -0.8,
        // Left face
        0.0,  0.8,  0.0,
        -0.8, -0.8, -0.8,
        -0.8, -0.8,  0.8,

    ];


    treetop_pir.colors = [
        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1,  
        0.2, 0.4, 0.1,  

        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 

        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1,  
        0.2, 0.4, 0.1, 

        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 
    ];

    treetop_pir.start_colors = [
        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1,  
        0.2, 0.4, 0.1,  

        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 

        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1,  
        0.2, 0.4, 0.1, 

        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 
        0.2, 0.4, 0.1, 
    ];


	computeVertexNormals( treetop_pir.vertices, treetop_pir.normals );

	return treetop_pir;
}