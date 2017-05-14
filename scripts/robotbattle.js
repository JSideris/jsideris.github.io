"use strict";

function Pawn(gameBoard, team, tile){
	this.health = 100;
	this.attack = 15;
	this.armour = 10;
	this.gameBoard = gameBoard;
	this.team = team;
	
	this.ai = new UserAi(this);
	
	this.tile = tile;
	tile.contains = new TileObsticle("unit", this);
	
	this.energy = 0;
}

//Swaps tiles.
Pawn.prototype.moveTo = function(newtile){
	this.tile.contains = null;
	this.tile = newtile;
	newtile.contains = new TileObsticle("unit", this);
}

//Uses energy to move.
Pawn.prototype.traverse = function(x, y){
	if(this.energy <= 0){
		return;
	}
	
	this.energy --;
	
	if(x < 0 || x >= this.gameBoard.tilesWidth || y < 0 || y >= this.gameBoard.tilesHeight){
		return;
	}
	
	var desiredTile = this.gameBoard.grid[y][x];
	
	if(desiredTile.contains != null){
		var obj = desiredTile.contains.object;
		switch(desiredTile.contains.type){
			case "unit":
				if(obj.team == this.team){
					return;
				}
				else{
					this.fight(obj);
				}
				break;
			case "base":
				if(obj == this.team){
					return;
				}
				else{
					obj.health -= Math.random() * this.attack;
					if(obj.health <= 0){
						//Current player wins game.
						obj.kill();
						this.moveTo(obj.baseTile);
					}
				}
				break;
		}
	}else{
		this.moveTo(desiredTile);
	}
	
}

Pawn.prototype.fight = function(opponent){
	opponent.health -= Math.max(0, Math.random() * this.attack - Math.random() * opponent.armour);
	if(opponent.energy > 0){
		//counter attack
		this.health -= Math.max(0, Math.random() * opponent.attack - Math.random() * this.armour);
	}
	opponent.energy--;
	
	if(opponent.health <= 0){
		opponent.kill();
		this.moveTo(opponent.tile);
		if(this.health <= 0){ //prioritize attacker victory to reward conquest.
			this.health = 1;
			//TODO: give other rewards, like improved attack, etc.
		}
	}
	else if(this.health <= 0){
		this.kill();
	}
}

Pawn.prototype.kill = function(){
	this.tile.contains = null;
	this.team.removeUnit(this);
}

Pawn.prototype.update = function(myTeam, otherTeams){
	try{
		this.team.aiUnitUpdate.call(this.ai, myTeam, otherTeams);
	}
	catch(e){
		//DOTO: maybe print error.
		console.log(e);
	}
	
}

function UserAi(mypawn, updateFunction){
	this.mypawn = mypawn;
}

UserAi.prototype.up = function(){
	this.mypawn.traverse(this.mypawn.tile.x, this.mypawn.tile.y - 1);
}

UserAi.prototype.down = function(){
	this.mypawn.traverse(this.mypawn.tile.x, this.mypawn.tile.y + 1);
}

UserAi.prototype.left = function(){
	this.mypawn.traverse(this.mypawn.tile.x - 1, this.mypawn.tile.y);
}

UserAi.prototype.right = function(){
	this.mypawn.traverse(this.mypawn.tile.x + 1, this.mypawn.tile.y);
}

UserAi.prototype.upLeft = function(){
	this.mypawn.traverse(this.mypawn.tile.x - 1, this.mypawn.tile.y - 1);
}

UserAi.prototype.upRight = function(){
	this.mypawn.traverse(this.mypawn.tile.x + 1, this.mypawn.tile.y - 1);
}

UserAi.prototype.downRight = function(){
	this.mypawn.traverse(this.mypawn.tile.x + 1, this.mypawn.tile.y + 1);
}

UserAi.prototype.downLeft = function(){
	this.mypawn.traverse(this.mypawn.tile.x - 1, this.mypawn.tile.y + 1);
}

UserAi.prototype.getGrid = function(){
	return new AStarGrid(this.mypawn.gameBoard.grid, this.mypawn.gameBoard.tilesWidth, this.mypawn.gameBoard.tilesHeight, this.mypawn);
}

UserAi.prototype.getPath = function(startX, startY, endX, endY, grid){
	if(!grid){
		grid = this.getGrid();
	}
	return aStar(grid.nodes[startY][startX], grid.nodes[endY][endX], grid);
}

UserAi.prototype.getX = function(){
	return this.mypawn.tile.x;
}

UserAi.prototype.getY = function(){
	return this.mypawn.tile.y;
}

function Tile(x, y){
	this.x = x;
	this.y = y;
	this.contains = null;
}

function GameBoard(tilesWidth, tilesHeight){
	this.tilesWidth = tilesWidth;
	this.tilesHeight = tilesHeight;
	this.grid = [];
	
	this.teams = [];
	
	this.timetick = 0;
	
	for(var y = 0; y < this.tilesHeight; y++){
		var row = [];
		this.grid.push(row);
		for(var x = 0; x < this.tilesWidth; x++){
			var tile = new Tile(x, y);
			row.push(tile);
			
			var r = Math.random();
			if(r > 0.6){
				tile.contains = new TileObsticle("boulder", null);
			}
		}
	}
}

GameBoard.prototype.update = function(){
	this.timetick++;
	for(var i = 0; i < this.teams.length; i++){
		var otherTeams = [];
		for(var j = 0; j < this.teams.length; j++){
			if(this.teams[i] != this.teams[j]){
				otherTeams.push(this.teams[j]);
			}
		}
		this.teams[i].update(otherTeams);
		this.teams[i].refresh();
	}
	for(var i = 0; i < this.teams.length; i++){
		this.teams[i].refresh();//refresh again.
		if(this.timetick < 10){
			this.teams[i].createUnit();
		}
	}
}

function TileObsticle(type, object){
	this.type = type;
	this.object = object;
}

function Team(gameBoard, teamNumber, baseX, baseY, aiUnitUpdate){
	this.gameBoard = gameBoard;
	this.teamNumber = teamNumber;
	this.baseTile = gameBoard.grid[baseY][baseX];
	
	for(var y = -1; y < 2; y++){
		for(var x = -1; x < 2; x++){
			if(baseX + x >= 0 && baseX + x < gameBoard.tilesWidth && baseY + y >= 0 && baseY + y < gameBoard.tilesHeight){
				if(gameBoard.grid[baseY + y][baseX + x].contains){
					if(gameBoard.grid[baseY + y][baseX + x].contains.kill){
						gameBoard.grid[baseY + y][baseX + x].contains.kill();
					}
					gameBoard.grid[baseY + y][baseX + x].contains = null;
				}
			}
		}
	}
	
	this.baseTile.contains = new TileObsticle("base", this);
	this.aiUnitUpdate = aiUnitUpdate;
	
	this.health = 500;
	
	this.units = [];
}

Team.prototype.update = function(otherTeams){
	for(var i = 0; i < this.units.length; i++){
		this.units[i].update(this, otherTeams);
	}
}

Team.prototype.createUnit = function(){
	var emptySpots = [];
	for(var y = -1; y < 2; y++){
		for(var x = -1; x < 2; x++){
			if(this.baseTile){
				var emptyTile = this.gameBoard.grid[this.baseTile.y + y][this.baseTile.x + x];
				if(emptyTile.contains == null){
					emptySpots.push(emptyTile);
				}
			}
		}
	}
	
	if(emptySpots.length > 0){
		var deployTileNumb = Math.floor(Math.random() * emptySpots.length);
		var newUnit = new Pawn(this.gameBoard, this, emptySpots[deployTileNumb]);
		this.units.push(newUnit);
	}
}

Team.prototype.removeUnit = function(unit){
	for(var i = 0; i < this.units.length; i++){
		if(this.units[i] == unit){
			this.units.splice(i, 1);
			break;
		}
	}
}

Team.prototype.refresh = function(){
	for(var i = 0; i < this.units.length; i++){
		this.units[i].energy = 1;
	}
}

Team.prototype.kill = function(){
	this.baseTile.contains = null;
	for(var i = 0; i < this.units.length; i++){
		this.units[i].kill();
	}
	//Finally, remove it from the game.
	//(todo)
}

function Levels(){
	this.level1BotAi = function(myTeam, otherTeams){
		var r = Math.random();
		if(r < 0.125){
			this.up();
		}
		else if(r < 0.25){
			this.down();
		}
		else if(r < 0.375){
			this.left();
		}
		else if(r < 0.5){
			this.right();
		} 
		else if(r < 0.625){
			this.upLeft();
		}
		else if(r < 0.75){
			this.downLeft();
		}
		else if(r < 0.875){
			this.upRight();
		}
		else if(r < 1){
			this.downRight();
		}
	}
	this.level2BotAi = function(myTeam, otherTeams){
		if(!this.p){
			this.p = this.getPath(this.getX(), this.getY(), otherTeams[0].baseTile.x, otherTeams[0].baseTile.y);
		}
		
		if(this.p != null && this.p.length > 0){
			if(this.p[0].x < this.getX()){
				if(this.p[0].y < this.getY()){
					this.upLeft();
				}
				if(this.p[0].y == this.getY()){
					this.left();
				}
				if(this.p[0].y > this.getY()){
					this.downLeft();
				}
			}
			if(this.p[0].x == this.getX()){
				if(this.p[0].y < this.getY()){
					this.up();
				}
				if(this.p[0].y == this.getY()){
					//???
				}
				if(this.p[0].y > this.getY()){
					this.down();
				}
			}
			
			if(this.p[0].x > this.getX()){
				if(this.p[0].y < this.getY()){
					this.upRight();
				}
				if(this.p[0].y == this.getY()){
					this.right();
				}
				if(this.p[0].y > this.getY()){
					this.downRight();
				}
			}
			if(this.getX() == this.p[0].x && this.getY() == this.p[0].y){
				this.p.shift();
			}
			else{
				this.p = null;
			}
		}
	}
	this.level3BotAi = function(myTeam, otherTeams){
		//Find the closest enemy and fight them. If no enemies exist, attack enemy base.
		if(otherTeams[0].units.length > 0){
			var closest = null;
			var closestDistance = Infinity;
			for(var i = 0; i < otherTeams[0].units.length; i++){
				var enemy = otherTeams[0].units[i];
				var thisDistance = (this.getX() - enemy.tile.x) * (this.getX() - enemy.tile.x) + (this.getY() - enemy.tile.y) * (this.getY() - enemy.tile.y);
				if(thisDistance < closestDistance){
					closest = enemy;
				}
			}
			this.p = this.getPath(this.getX(), this.getY(), closest.tile.x, closest.tile.y);
		}
		else{
			//if(!this.p){

				this.p = this.getPath(this.getX(), this.getY(), otherTeams[0].baseTile.x, otherTeams[0].baseTile.y);
			//}
		}
		
		if(this.p != null && this.p.length > 0){
			if(this.p[0].x < this.getX()){
				if(this.p[0].y < this.getY()){
					this.upLeft();
				}
				if(this.p[0].y == this.getY()){
					this.left();
				}
				if(this.p[0].y > this.getY()){
					this.downLeft();
				}
			}
			if(this.p[0].x == this.getX()){
				if(this.p[0].y < this.getY()){
					this.up();
				}
				if(this.p[0].y == this.getY()){
					//???
				}
				if(this.p[0].y > this.getY()){
					this.down();
				}
			}
			
			if(this.p[0].x > this.getX()){
				if(this.p[0].y < this.getY()){
					this.upRight();
				}
				if(this.p[0].y == this.getY()){
					this.right();
				}
				if(this.p[0].y > this.getY()){
					this.downRight();
				}
			}
			if(this.getX() == this.p[0].x && this.getY() == this.p[0].y){
				this.p.shift();
			}
			else{
				this.p = null;
			}
		}
		
	}
}
var Levels = new Levels();

function redrawView(board){
	for(var y = 0; y < board.tilesHeight; y++){
		for(var x = 0; x < board.tilesWidth; x++){
			var tileView = $("#rwcell-" + x + "-" + y);
			tileView.removeClass("rwredrobot");
			tileView.removeClass("rwbluerobot");
			tileView.removeClass("rwredbase");
			tileView.removeClass("rwbluebase");
			tileView.removeClass("rwrockobsticle");
			
			var gameTile = board.grid[y][x];
			
			if(gameTile.contains != null){
				var obj = gameTile.contains.object;
				switch(gameTile.contains.type){
					case "unit":
						if(obj.team.teamNumber == 1){
							tileView.addClass("rwbluerobot");
						}
						else{
							tileView.addClass("rwredrobot");
						}
						break;
					case "base":
						if(obj.teamNumber == 1){
							tileView.addClass("rwbluebase");
						}
						else{
							tileView.addClass("rwredbase");
						}
						break;
					case "boulder":
						tileView.addClass("rwrockobsticle");
						break;
				}
			}
		}
	}
}

function beginGame(w, h){
	var mainBoard = new GameBoard(w, h);
	var team1 = new Team(mainBoard, 1, 9,  9,  Levels.level3BotAi);
	var team2 = new Team(mainBoard, 2, w - 10, h - 10, Levels.level3BotAi);
	mainBoard.teams = [team1, team2];
	//TODO: make sure the bases are connected...
	
	//game loop
	Sequencr.do(function(){
		mainBoard.update();
		
		redrawView(mainBoard);
		
		//Check if one of the players has been destroyed.
		/*for(var i = 0 ; i < mainBoard.teams.length; i++){
			var team = mainBoard.teams[i];
			if(team.)
		}*/
		
		if(team1.health < 0 || team2.health < 0){
			setTimeout(function(){beginGame(w, h)}, 1000);
			return false;
		}
	}, 100);
}