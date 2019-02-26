var MapRenderer = {};

MapRenderer.map = null;

MapRenderer.initialize = function(map, canvasManager){
    this.canvasManager = canvasManager;
    this.map = map;

    for(var i = 0; i < map.width; i++){
        for(var j = 0; j < map.height; j++){
            var tileCoodinates = this.getMapToCanvasCoordinates(i,j);
            var newTile = new TileShape(tileCoodinates.x, tileCoodinates.y);
            this.map.tiles[i][j].addShape(newTile);
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