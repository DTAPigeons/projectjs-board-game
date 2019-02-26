var Map = function(width, height){
    this.width = width;
    this.height = height;
    this.tiles = new Array(width);
    for(var i = 0; i < width; i++){
        
        this.tiles[i] = new Array(height);

        for(var j = 0; j < height; j++){
            
            this.tiles[i][j] = new Tile(i,j);

        }
    }
}