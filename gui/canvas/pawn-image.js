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
    this.image = Image(this.width,this.height)
    this.image.src = source;
};

PawnImage.prototype.render = function(context){
    context.drawImage(this.Image,this.x,this.y);
}
