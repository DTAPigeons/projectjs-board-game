var Tile = function(x, y){
    this.x = x;
    this.y = y;
    this.state = "default";
    this.occupant = null;
}

Tile.prototype.addShape = function(shape){
    this.shape = shape;
}

Tile.prototype.invalid = function(){
    this.state = "invalid";
    this.shape.tileInvalid();
}

Tile.prototype.default = function(){
    this.state = "default";
    this.occupant = null;
    this.shape.tileDefault();
}

Tile.prototype.castle = function(){
    this.state = "castle";
    this.shape.tileCastle();
}

Tile.prototype.occupy = function(occupant){
    this.occupant = occupant;
    this.state = "occupied";
    this.shape.tileOccupied(occupant);
}

Tile.prototype.occupied = function(){
    return this.occupant!=null;
}
