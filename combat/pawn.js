var Pawn = function(hitPoints=1,damage=0,defence=0,range=0,speed=0,playerOwner = 0,imageSrc = null){
    this.damage = damage;
    this.defence = defence;
    this.hitPoints = hitPoints;
    this.range = range;
    this.speed = speed;
    this.tileOccupied = null;
    this.playerOwner = playerOwner;
    this.imageSrc = imageSrc;
    this.image = null;
}

Pawn.prototype.occupyTile= function(tile){
    this.tileOccupied = tile;
    tile.occupy(this);
}
Pawn.prototype.initializeImage = function(){
    if(imageSrc!=null){
        image = new PawnImage(this.tileOccupied.x,this.tileOccupied.y,this.imageSrc);
    }
}