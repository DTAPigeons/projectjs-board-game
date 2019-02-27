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

Pawn.prototype.takeDamage = function(damage){
    var damageTaken = damage - this.defence;

    var diceOne = Math.floor(Math.random() * 6)+1;
    var diceTwo = Math.floor(Math.random() * 6)+1;
    var diceThree = Math.floor(Math.random() * 6)+1;

    if(diceOne+diceTwo+diceThree==this.hitPoints) {damageTaken =  0;}
    if(diceOne+diceTwo+diceThree==3) {damageTaken =  Math.floor(damageTaken/2);}

    this.hitPoints -=damageTaken;

    CombatManager.pawnTookDamage(this.playerOwner,damageTaken);

    console.log(damageTaken+ " " + this.hitPoints);

    if(this.hitPoints<=0){
        this.die();
    }

}

Pawn.prototype.die = function(){
    this.tileOccupied.default();
    CanvasManager.addPawn(this.image);
    if(this.image!=null){this.image.show = false;}
    CombatManager.pawnDied(this.playerOwner);
}