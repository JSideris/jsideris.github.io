//Copyright 2016 - Joshua Sideris
//Do not use without permission.

"use strict";



function GearBox(canvas){
	this.UNIT_C = 2 * 3.14159;
	this.canvas = canvas;
	this.width = canvas.offsetWidth;
	this.height = canvas.offsetHeight;
	this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {view: canvas, antialias: true });
	this.stage = new PIXI.Container();
	this.stage.interactive = true;
	this.ticks = 0;
	
	this.driveGear = this.generateRandomGear();
	this.layers = [];

	
	this.driveGear.x(this.width / 2);
	this.driveGear.y(this.height / 2);
	
	this.addGearToStage(this.driveGear);
	this.layers.push([]);
	this.layers[0].push(this.driveGear);
	this.addManyGears(this.driveGear, 2, 0);

	this.mode = "oscillate";
	this.period = 10 + Math.random() * 20;
	this.oscillationSpeed = 0.01 + Math.random() * 0.05;
	this.oscillationBias = Math.random() * this.oscillationSpeed;
	if(Math.random() > 0.5){
		this.mode = "fixed";
	}
	
	// run the render loop
	this.animate();
}


GearBox.prototype.animate = function() {
	
	this.renderer.render(this.stage);
	
	switch(this.mode){
		case "oscillate":
			this.driveGear.turn(this.oscillationBias + this.oscillationSpeed * Math.sin(this.ticks / this.period));
			break;
		case "fixed":
			this.driveGear.turn(0.01);
			break;
	}
	
	this.ticks++;
	
	var self = this;
	requestAnimationFrame(function(){self.animate()});
}

GearBox.prototype.generateRandomGear = function(){
	//this.pitch * this.numbTeeth / (this.UNIT_C * 2) >= this.workingDepth
	
	var numbTeeth = ~~(3 + Math.random() * 20);
	var pitch = numbTeeth + Math.random() * /*20*/50;
	var workingDepth = Math.min(pitch * numbTeeth / (this.UNIT_C * 2), 5 + Math.random() * Math.sqrt(pitch * numbTeeth));
	
	return new Gear(this, pitch, workingDepth, numbTeeth);
}

GearBox.prototype.addManyGears = function(parentGear, iterations, layer){
	
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
			for(var j = 0; j < this.layers[layer].length; j++){
				g = this.layers[layer][j];
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
				this.addGearToStage(newgear);
				this.layers[layer].push(newgear);
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
				for(var j = layer + 1; j < this.layers.length; j++){
					for(var k = 0; k < this.layers[j].length; k++){
						var g2 = this.layers[j][k];
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
					this.addGearToStage(newgear);
					
					this.layers.push([]);
					this.layers[this.layers.length - 1].push(newgear);
					
					this.addManyGears(newgear, iterations - 1, this.layers.length - 1);
				}
			}
		}
	}
}

GearBox.prototype.addGearToStage = function(gear){
	this.stage.addChild(gear.mask());
	this.stage.addChild(gear.graphics());
	gear.graphics().mask = gear.mask();
}

/*GearCanvas.prototype.createGearsCanvas = function(){

}*/

//Gear object.
function Gear(gearbox, pitch, workingDepth, numbTeeth)
{
	this.gearbox = gearbox;
	this.attachedDependentGears = [];
	this.dependentShaftGears = [];
	
	this.UNIT_C = 2 * 3.14159;
	
	this.pitch = pitch;
	this.workingDepth = workingDepth;
	this.numbTeeth = numbTeeth;
	this.outerC = this.pitch * this.numbTeeth;
	this.outerR = this.outerC / this.UNIT_C;
	this.innerR = this.outerR - this.workingDepth;
	this.innerC = this.innerR * this.UNIT_C;
	this.maskInnerR = this.innerR * Math.random() * 0.8;
	/*META - Used for iterating.*/
	this._turned = false;
	this._turnedAmount = false;
	
	this._graphics = null;
	this._mask = null;
}

Gear.prototype.getRandomColor = function() {
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

//Draws the graphics and returns an instance.
Gear.prototype.graphics = function(){
	if(this._graphics == null){
		
		this._graphics = new PIXI.Graphics();
		var c = this.getRandomColor();
		this._graphics.beginFill(c[0]);
		this._graphics.lineStyle(1, c[0], 1);
		
		
		var da = ((this.UNIT_C / this.numbTeeth) / 4);
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
		newmask.drawCircle(0, 0, this.maskInnerR);
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
	var newGear = new Gear(this.gearbox, this.pitch, this.workingDepth, numbTeeth);
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
	//We want: R >= Working depth. Otherwise you get gears that look really weird.
	//this.outerR - this.workingDepth >= this.workingDepth
	//this.outerC / this.UNIT_C - this.workingDepth >= this.workingDepth
	//this.pitch * this.numbTeeth / this.UNIT_C - this.workingDepth >= this.workingDepth
	//this.numbTeeth >= 2 * this.workingDepth * this.UNIT_C / this.pitch
	
	return this.connectNew(~~Math.max((2 * this.workingDepth * this.UNIT_C / this.pitch), (3 + Math.random() * 20)), Math.random() * this.UNIT_C);
}

Gear.prototype.connectNewRandomToShaft = function(){
	var newgear = this.gearbox.generateRandomGear();
	if(newgear.innerR - 5 > this.outerR){
		newgear.maskInnerR = this.outerR;
	}
	if(this.innerR - 5 > newgear.outerR){
		this.maskInnerR = newgear.outerR;
	}
	newgear.x(this.x());
	newgear.y(this.y());
	//newgear.graphics.rotation = Math.random * this.UNIT_C;
	this.dependentShaftGears.push(newgear);
	return newgear;
}


