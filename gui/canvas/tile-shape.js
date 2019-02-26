var TileShape = function(x, y, color = "white", border = "black") {
    
    this.x = x;
    this.y = y;
    this.width = 99;
    this.height = 99;
    this.color = color;
    this.border = border;

    this.name   = null;
};

TileShape.prototype.updateColor = function(color){
    this.color = color;
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