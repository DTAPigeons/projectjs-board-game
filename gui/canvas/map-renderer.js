var MapRenderer = {};


MapRenderer.initialize = function(){
    for(var i = 0; i < Map.width; i++){
        for(var j = 0; j < Map.height; j++){
            var newShape = this.creatShapeForTile(i,j);
            Map.tiles[i][j].addShape(newShape);
            CanvasManager.addShape(newShape);
        }
    }
}

MapRenderer.creatShapeForTile  =function(tilex, tiley, color = "white", width = 100, height = 100, border = "black"){
    var shapeCoodinates = this.getMapToCanvasCoordinates(tilex,tiley);
    var newShape = new TileShape(shapeCoodinates.x, shapeCoodinates.y, color, width, height,border);
    return newShape;
}

MapRenderer.getMapToCanvasCoordinates = function(mapX, mapY){
    var coordinates = {
        x:100*mapX,
        y:100*mapY
    };

    return coordinates;
}

MapRenderer.getTileOfMousePosition = function(){
    var mousePosition = CanvasManager.currentMousePosition;
    var coordinates = {
        x:Math.floor(mousePosition.x/100),
        y:Math.floor(mousePosition.y/100)
    };
    
    return Map.tiles[coordinates.x][coordinates.y];
}
