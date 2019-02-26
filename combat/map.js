var Map = {};

Map.initialize = function(width, height){
    this.width = width;
    this.height = height;
    this.tiles = new Array(width);
    this.playerRows = 2;
    for(var i = 0; i < width; i++){
        
        this.tiles[i] = new Array(height);

        for(var j = 0; j < height; j++){
            
            this.tiles[i][j] = new Tile(i,j);

        }
    }
}

Map.setUpPhase = function(isPlayerOne, playerRows=2){
    this.playerRows = playerRows;
    for(var i = 0; i < this.width; i++){        
        for(var j = 0; j < this.height; j++){
            if(this.tiles[i][j].occupant!=null){continue;}
            var isPlayerRow = isPlayerOne ? (j<playerRows) : j>=this.height-playerRows;
            if(isPlayerRow){
                this.tiles[i][j].castle();
            }
            else{
                this.tiles[i][j].invalid();
            }          
        }
    }
}

Map.startCombat = function(maxObsticles=5){
    var numberOfObsticles = 0;
    for(var i = 0; i < this.width; i++){        
        for(var j = 0; j < this.height; j++){
            if(this.tiles[i][j].occupant==null)this.tiles[i][j].default();
            var isPlayerRow =(j<this.playerRows) || (j>=this.height-this.playerRows);
            if(!isPlayerRow && numberOfObsticles<maxObsticles){
                var rand = Math.floor(Math.random() * 10);
                if(rand<2){
                   var obsticle = new Pawn();
                   obsticle.occupyTile(this.tiles[i][j]);
                   numberOfObsticles++;
                }
            }     
        }
    }
}

