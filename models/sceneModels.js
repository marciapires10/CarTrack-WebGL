//////////////////////////////////////////////////////////////////////////////
//
//  For instantiating the scene models.
//
//  Adapted From J. Madeira - November 2018
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Constructors
//


function emptyModelFeatures() {

	// EMPTY MODEL
	this.name = "";

	this.vertices = [];

	this.normals = [];
	
	this.colors = [];

	this.start_colors = [];
	// Transformation parameters

	// Displacement vector
	
	this.tx = 0.0;
	
	this.ty = 0.0;
	
	this.tz = 0.0;	
	
	// Rotation angles	
	
	this.rotAngleXX = 0;
	
	this.rotAngleYY = 0;
	
	this.rotAngleZZ = 0;	

	// Scaling factors
	
	this.sx = 0.1;
	
	this.sy = 0.1;
	
	this.sz = 0.1;		
	
	// Animation controls
	
	this.rotXXOn = true;
	
	this.rotYYOn = true;
	
	this.rotZZOn = true;
	
	this.rotXXSpeed = 1.0;
	
	this.rotYYSpeed = 1.0;
	
	this.rotZZSpeed = 1.0;
	
	this.rotXXDir = 1;
	
	this.rotYYDir = 1;
	
	this.rotZZDir = 1;
	
	// Material features
	
	this.kAmbi = [ 0.05, 0.2, 0.2 ];
	
	this.kDiff = [ 0.05, 0.2, 0.2 ];

	this.kSpec = [ 0.05, 0.1, 0.1 ];

	this.nPhong = 100;
}


