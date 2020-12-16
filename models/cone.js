// cone model

function coneModel( ) {
    
	var cone = new emptyModelFeatures();
    
    cone.name = "CONE";

    cone.vertices = [
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

    console.log("cone");

    cone.colors = [
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

    console.log(cone.colors);

	computeVertexNormals( cone.vertices, cone.normals );

	return cone;
}