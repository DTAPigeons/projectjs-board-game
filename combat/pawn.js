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
    if(this.tileOccupied!=null){ this.tileOccupied.default(); }
    this.tileOccupied = tile;
    tile.occupy(this);
    if(this.image!=null){ this.image.moved(tile.x,tile.y); }
}


Pawn.prototype.initializeImage = function(){
    if(this.imageSrc!=null){
        this.image = new PawnImage(this.tileOccupied.x,this.tileOccupied.y,this.imageSrc);
        CanvasManager.addPawn(this.image);
    }
}