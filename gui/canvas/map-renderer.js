var MapRenderer = {};


MapRenderer.initialize = function(){
    for(var i = 0; i < Map.width; i++){
        for(var j = 0; j < Map.height; j++){
            var tileCoodinates = this.getMapToCanvasCoordinates(i,j);
            var newTile = new TileShape(tileCoodinates.x, tileCoodinates.y);
            Map.tiles[i][j].addShape(newTile);
            CanvasManager.addShape(newTile);
        }
    }
}

MapRenderer.getMapToCanvasCoordinates = function(mapX, mapY){
    var coordinates = {
        x:100*mapX,
        y:100*mapY
    };

    return coordinates;
}