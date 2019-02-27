var PawnImage = function(x,y, source) {
    this.x = x;
    this.y = y;
    this.moved = function(x,y){
        var newLocation = MapRenderer.getMapToCanvasCoordinates(x,y);
        this.x = newLocation.x;
        this.y = newLocation.y;
    }
    this.moved(x,y);
    this.width = 90;
    this.height = 90;
    this.source   = source;
    this.image = source;
    this.show = true;
};

PawnImage.prototype.render = function(context){
    if(!this.show){return;}
    context.drawImage(this.image,this.x,this.y,this.width,this.height);
}