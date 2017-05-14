function AStarGrid(grid, width, height, pawn){
	this.nodes = [];
	this.width = width;
	this.height = height;
	for(var y = 0; y < height; y++){
		var row = [];
		this.nodes.push(row);
		for(var x = 0; x < width; x++){
			var thisTile = grid[y][x];
			
			var cost = 1;
			if(thisTile.contains != null){
				switch(thisTile.contains.type){
					case "unit":
						if(thisTile.contains.object.team == pawn.team){
							cost = 15;
						}
						else{
							cost = 10;
						}
						break;
					case "boulder":
						cost = Infinity;
						break;
					case "base":
						if(thisTile.contains.object == pawn.team){
							cost = Infinity;
						}
						else{
							cost = 15;
						}
						break;
				}
			}
			//Check to make sure we aren't going past enemies.
			for(var dy = -1; dy < 2; dy++){
				for(var dx = -1; dx < 2; dx++){
					if(x + dx >= 0 && x + dx < width && y + dy >= 0 && y + dy < height){
						adjacentGridTile = grid[y + dy][x + dx];
						if(adjacentGridTile.type == "unit" && adjacentGridTile.object.team != pawn.team){
							cost += 3;
						}
					}
				}
			}
			
			var node = new AStarNode(x, y, cost);
			row.push(node);
			for(var dy = -1; dy < 1; dy++){
				for(var dx = -1; dx < 2; dx++){
					if(y + dy >= 0 && x + dx >= 0 && x + dx < width && (dy < 0 || dx < 0)){
						var adjNode = this.getNode(x + dx, y + dy);
						var adjTile = grid[y + dy][x + dx];
						
						if(adjNode.cost != Infinity){
							node.adjacent.push(adjNode);
						}
						if(node.cost != Infinity){
							adjNode.adjacent.push(node);
						}
					}
				}
			}
		}
	}
}

AStarGrid.prototype.getNode = function(x, y){
	return this.nodes[y][x];
}

function AStarNode(x, y, cost){
	this.x = x;
	this.y = y;
	this.cost = cost;
	this.adjacent = [];
}

function aStar(start, goal, grid){
    // The set of nodes already evaluated.
    var closedSet = [];
    // The set of currently discovered nodes still to be evaluated.
    // Initially, only the start node is known.
    var openSet = [];
	openSet.push(start);
    // For each node, which node it can most efficiently be reached from.
    // If a node can be reached from many nodes, cameFrom will eventually contain the
    // most efficient previous step.
    var cameFrom = [];
	for(var y = 0; y < grid.height; y++){
		var row = [];
		cameFrom.push(row);
		for(var x = 0; x < grid.width; x++){
			row.push(null);
		}
	}

    // For each node, the cost of getting from the start node to that node.
    var gScore = [];
	for(var y = 0; y < grid.height; y++){
		var row = [];
		gScore.push(row);
		for(var x = 0; x < grid.width; x++){
			row.push(Infinity);
		}
	}
    // The cost of going from start to start is zero.
    gScore[start.y][start.x] = 0;
    // For each node, the total cost of getting from the start node to the goal
    // by passing by that node. That value is partly known, partly heuristic.
    var fScore = [];
	for(var y = 0; y < grid.height; y++){
		var row = [];
		fScore.push(row);
		for(var x = 0; x < grid.width; x++){
			row.push(Infinity);
		}
	}
    // For the first node, that value is completely heuristic.
    fScore[start.y][start.x] = heuristic_cost_estimate(start, goal);

    while (openSet.length > 0){
		//First, make sure destination isn't blocked.
		
		
		var current = openSet[0];
		var bestScore = fScore[current.y][current.x];
		for(var i = 1; i < openSet.length; i++){
			var currentScore = fScore[openSet[i].y][openSet[i].x];
			if(currentScore < bestScore){
				bestScore = currentScore;
				current = openSet[i];
			}
		}
        if (current == goal)
            return reconstruct_path(cameFrom, current);

        openSet.splice(openSet.indexOf(current), 1)
        closedSet.push(current)
        for(var i = 0; i < current.adjacent.length; i++){
			var neighbor = current.adjacent[i];
            if (closedSet.indexOf(neighbor) !== -1) //TODO: index of doesn't work in IE 8.
                continue;		// Ignore the neighbor which is already evaluated.
            // The distance from start to a neighbor
            var tentative_gScore = gScore[current.y][current.x] + neighbor.cost + heuristic_cost_estimate(neighbor, goal) / 100;//dist_between(current, neighbor)
            if (openSet.indexOf(neighbor) == -1)	// Discover a new node
                openSet.push(neighbor)
            else if (tentative_gScore >= gScore[neighbor.y][neighbor.x])
                continue		// This is not a better path.

            // This path is the best until now. Record it!
            cameFrom[neighbor.y][neighbor.x] = current;
            gScore[neighbor.y][neighbor.x] = tentative_gScore;
            fScore[neighbor.y][neighbor.x] = gScore[neighbor.y][neighbor.x] + heuristic_cost_estimate(neighbor, goal);
		}
	}
    return null;
}

function heuristic_cost_estimate(node, goal){
	return Math.sqrt((node.x - goal.x) * (node.x - goal.x) + (node.y - goal.y) * (node.y - goal.y));
}

function reconstruct_path(cameFrom, current){
    var total_path = [];
	total_path.unshift(current);
    while (current != null){
        current = cameFrom[current.y][current.x];
		if(current)
			total_path.unshift(current);
	}
	total_path.splice(0, 1);
    return total_path;
}