var CanvasManager = {};

CanvasManager.canvas    = null; 
CanvasManager.context   = null;

CanvasManager.initialize = function(element) {
    this.canvas = document.getElementById(element);
    this.context = this.canvas.getContext('2d');
};

// Contains all shapes of the canvas application
CanvasManager.layerShapeCollection = [];

CanvasManager.addShape = function(element) {
    this.layerShapeCollection.push(element);
};

CanvasManager.render = function() {

    // clear canvas container 
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

    // render shape objects 
    for(var i = 0; i < this.layerShapeCollection.length; i++) {
        this.layerShapeCollection[i].render(this.context);
    }
};

CanvasManager.onMouseDown = function(callback) {
    this.canvas.addEventListener('mousedown', callback);
}

CanvasManager.onMouseMove = function(callback) {
    this.canvas.addEventListener('mousemove', callback);
};

CanvasManager.onMouseUp = function(callback) {
    this.canvas.addEventListener('mouseup', callback);
};