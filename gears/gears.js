//Copyright 2016 - Joshua Sideris
//Do not use without permission.

var renderer;
var stage;
var UNIT_C = 2 * 3.14159;
var driveGear;
var layers = [];

function getRandomColor() {
    //return Math.floor(Math.random()*16777215);
	var grey = ~~(Math.random() * 256);
	var yellow = ~~(Math.random() * (256 - grey));
	var red = ~~(Math.random() * (256 - yellow - grey));
	//var yellow = 0;
	//var red = 0;
	
	var r = grey;
	var g = grey + yellow;
	var b = grey + yellow + red;
	
	var r2 = ~~(r / 2);
	var g2 = ~~(r / 2);
	var b2 = ~~(r / 2);
	
    return [Math.floor(r + g * 256 + b * 256 * 256), Math.floor(r2 + g2 * 256 + b2 * 256 * 256)];
}

function animate() {

	renderer.render(stage);
	requestAnimationFrame( animate );
	
	driveGear.turn(0.01);
}

//Gear object.
function Gear(pitch, workingDepth, numbTeeth)
{
	this.attachedDependentGears = [];
	this.dependentShaftGears = [];
	
	this.pitch = pitch;
	this.workingDepth = workingDepth;
	this.numbTeeth = numbTeeth;
	this.outerC = this.pitch * this.numbTeeth;
	this.outerR = this.outerC / UNIT_C;
	this.innerR = this.outerR - this.workingDepth;
	this.innerC = this.innerR * UNIT_C;
	/*META - Used for iterating.*/
	this._turned = false;
	this._turnedAmount = false;
	
	this._graphics = null;
	this._mask = null;
}

//Draws the graphics and returns an instance.
Gear.prototype.graphics = function(){
	if(this._graphics == null){
		
		this._graphics = new PIXI.Graphics();
		var c = getRandomColor();
		this._graphics.beginFill(c[0]);
		this._graphics.lineStyle(1, c[0], 1);
		
		
		var da = ((UNIT_C / this.numbTeeth) / 4);
		for(var i = 0; i < this.numbTeeth; i++){
			
			this._graphics.arc(0, 0, this.innerR, da * (i) * 4, da * (i * 4 + 1), false);
			this._graphics.arc(0, 0, this.outerR, da * (i * 4 + 2), da * (i * 4 + 3), false);
		}
		this._graphics.endFill();	
	}
	
	return this._graphics;
}

//Creates the invisible middle.
Gear.prototype.mask = function(){
	if(this._mask == null){
		var newmask = new PIXI.Graphics();
		newmask.beginFill(0xFFFFFF);
		newmask.drawCircle(0, 0, this.outerR);
		newmask.endFill();
		newmask.beginFill(0x000000);
		newmask.drawCircle(0, 0, this.innerR * Math.random() * 0.8);
		newmask.endFill();
		//this._mask = new PIXI.Sprite(newmask.generateTexture());
		this._mask = newmask;
	}
	return this._mask;
}

Gear.prototype.x = function(value){
	if(value !== undefined){
		this.graphics().position.x = value;
		this.mask().position.x = value;
		return value;
	}
	return this.graphics().position.x;
}

Gear.prototype.y = function(value){
	if(value !== undefined){
		this.graphics().position.y = value;
		this.mask().position.y = value;
		return value;
	}
	return this.graphics().position.y;
}

Gear.prototype.rotation = function(value){
	if(value !== undefined){
		
		try{
			this.graphics().rotation = value;
		}
		catch(e){
			
		}
		return value;
	}
	try{
		return this.graphics().rotation;
	}
	catch(e){
		return 0;
	}
}

Gear.prototype.destroy = function(){
	if(this._graphics != null){
		this._graphics.destroy();
	}
}

//rads is relative to the current position. Can be negative for counter clockwise rotations.
Gear.prototype.turn = function(rads){
	if(!this._turned){
		this._turned = true;
		this._turnedAmount = rads;
		this.rotation(this.rotation() + rads);
		
		var allTurnsOk = true;
		for(var i = 0; i < this.attachedDependentGears.length; i++){
			var g = this.attachedDependentGears[i];
			allTurnsOk = allTurnsOk && g.turn(-rads * (this.numbTeeth / g.numbTeeth));
		}
		for(var i = 0; i < this.dependentShaftGears.length; i++){
			var g = this.dependentShaftGears[i];
			allTurnsOk = allTurnsOk && g.turn(rads);
		}
		
		if(!allTurnsOk){
			//Unturn
			this.rotation(this.rotation() - rads);
			for(var i = 0; i < this.attachedDependentGears.length; i++){
				var g = this.attachedDependentGears[i];
				g.turn(rads * (this.numbTeeth / g.numbTeeth));
			}	
			for(var i = 0; i < this.dependentShaftGears.length; i++){
				var g = this.dependentShaftGears[i];
				allTurnsOk = allTurnsOk && g.turn(-rads);
			}
			
			this._turned = false;
			return false;
		}
		
		this._turned = false;
		return true;
	}
	else{
		//This might break the gear chain.
		if(Math.abs(rads - this._turnedAmount) > 0.001){
			console.log("Jam!");
			return false; //TODO: let out some type of animation indicating a jam.
		}
		else{
			return true;
		}
	}
}

Gear.prototype.connectNew = function(numbTeeth, angleRad){
	//debug:
	//var d = new Date();
	//var n = (d.getSeconds() + d.getMilliseconds() / 1000) / 60.0;
	//angleRad = (n * 5) * 3.14159 * 2;
	var newGear = new Gear(this.pitch, this.workingDepth, numbTeeth);
	newGear.turn(3.14159 //Turn 180 so the new gear mirrors this gear (with 0 rotation) on the left, even with an odd number of teeth.
		+ ((newGear.pitch / newGear.outerR) / 4) //Since we're dealing with a mirror image, turn 1/4
		- (this.rotation() * (this.numbTeeth / newGear.numbTeeth)) //Consider the current rotation of this gear when setting the new gear.
		+ angleRad * ((this.numbTeeth / newGear.numbTeeth) + 1)); //Turn the new gear based on it's position around this gear.
	newGear.x(this.x() + Math.cos(angleRad) * (this.innerR + newGear.outerR));
	newGear.y(this.y() + Math.sin(angleRad) * (this.innerR + newGear.outerR));
	
	this.attachedDependentGears.push(newGear);
	
	return newGear;
}

Gear.prototype.connectNewRandom = function(){
	//TODO: there may be a minimum number of teeth given the required pitch and working depth.
	return this.connectNew(~~(3 + Math.random() * 20), Math.random() * UNIT_C);
}

Gear.prototype.connectNewRandomToShaft = function(){
	var newgear = generateRandomGear();
	newgear.x(this.x());
	newgear.y(this.y());
	//newgear.graphics.rotation = Math.random * UNIT_C;
	this.dependentShaftGears.push(newgear);
	return newgear;
}

function generateRandomGear(){
	var numbTeeth = ~~(3 + Math.random() * 20);
	var pitch = numbTeeth + Math.random() * /*20*/50;
	var workingDepth = 5 + Math.random() * Math.sqrt(pitch * numbTeeth);
	
	return new Gear(pitch, workingDepth, numbTeeth);
}

function addManyGears(stage, parentGear, iterations, layer){
	
	var currentList = [];
	var gearQ = [];
	gearQ.push(parentGear);
	
	var gearsLeft = iterations * 3;
	while(gearQ.length > 0 && gearsLeft > 0){
		var current = gearQ.shift();
		for(var i = 0; i < 3; i++){
			var newgear = current.connectNewRandom();	
			
			//Check to ensure this gear is not interfering with any of the other gears on this layer.
			var isBlocking = false;
			for(var j = 0; j < layers[layer].length; j++){
				g = layers[layer][j];
				if(g != current
					&& ((g.x() - newgear.x())
					* (g.x() - newgear.x())
					+ (g.y() - newgear.y())
					* (g.y() - newgear.y()))
					< (g.outerR + newgear.outerR) * (g.outerR + newgear.outerR)){
						isBlocking = true;
						newgear.destroy();
						break;
					}
			}
			
			if(!isBlocking){
				currentList.push(newgear);
				gearQ.push(newgear);
				addGearToStage(newgear, stage);
				layers[layer].push(newgear);
			}
		}
		gearsLeft--;
	}
		
	if(iterations > 0){
		
		//For each gear in the current layer.
		for(var i = 0; i < currentList.length; i++){
			var g = currentList[i];
			
			if(Math.random() > 0.4){
				var isBlocking = false;
				//Make sure nothing is blocking the way to the top layer.
				for(var j = layer + 1; j < layers.length; j++){
					for(var k = 0; k < layers[j].length; k++){
						g2 = layers[j][k];
						if(g != g2
							&& ((g.x() - g2.x())
							* (g.x() - g2.x())
							+ (g.y() - g2.y())
							* (g.y() - g2.y()))
							< (g2.outerR + 10) * (g2.outerR + 10)) //Assuming 10 is the shaft radius.
						{
							isBlocking = true;
							break;
						}
					}
					
					if(isBlocking) break;
				}
				
				if(!isBlocking){
					var newgear = g.connectNewRandomToShaft();	
					addGearToStage(newgear, stage);
					
					layers.push([]);
					layers[layers.length - 1].push(newgear);
					
					addManyGears(stage, newgear, iterations - 1, layers.length - 1);
				}
			}
		}
	}
}

function addGearToStage(gear, stage){
	stage.addChild(gear.mask());
	stage.addChild(gear.graphics());
	gear.graphics().mask = gear.mask();
}

$(function(){
	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { antialias: true });
	document.body.appendChild(renderer.view);

	// create the root of the scene graph
	stage = new PIXI.Container();

	stage.interactive = true;
	
	driveGear = generateRandomGear();
	driveGear.x(window.innerWidth / 2);
	driveGear.y(window.innerHeight / 2);
	
	addGearToStage(driveGear, stage);
	layers[0] = [];
	layers[0].push(driveGear);
	addManyGears(stage, driveGear, 1, 0);

	// run the render loop
	setTimeout(animate, 10);
});