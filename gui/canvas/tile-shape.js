var TileShape = function(x, y, color = "white", border = "black") {
    this.castleColor = "#8a8a8e";
    this.blockedTileColor = "black";
    this.playerOneColor = "yellow";
    this.playerTwoColor = "blue";
    this.defaultTileColor = "white";
    this.invalidTileColor= "red";
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = color;
    this.border = border;

    this.name   = null;
};

TileShape.prototype.updateColor = function(color){
    this.color = color;
}

TileShape.prototype.tileDefault = function(){
    this.updateColor(this.defaultColor);
}

TileShape.prototype.tileCastle = function(){
    this.updateColor(this.castleColor);
}

TileShape.prototype.tileOccupied = function(occupant){
    if(occupant.playerOwner == 1){
        this.updateColor(this.playerOneColor);
    }
    else if(occupant.playerOwner == 2){
        this.updateColor(this.playerTwoColor);
    }
    else{
        this.updateColor(this.blockedTileColor);
    }
}

TileShape.prototype.tileInvalid = function(){
    this.updateColor(this.invalidTileColor);
}

TileShape.prototype.render = function(context){
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.color;
    context.strokeStyle = this.border;
    context.stroke();
    context.fill();
    context.closePath();
}