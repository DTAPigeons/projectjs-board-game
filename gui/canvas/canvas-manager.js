var CanvasManager = {};

CanvasManager.canvas    = null; 
CanvasManager.context   = null;
CanvasManager.currentMousePosition   = {x:0,y:0};

CanvasManager.initialize = function(element) {
    this.canvas = document.getElementById(element);
    this.context = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', function(event){ CanvasManager.setMousePosition(event, CanvasManager.canvas)});
};

// Contains all shapes of the canvas application
CanvasManager.tileLayerShapeCollection = [];
CanvasManager.pawnLayerShapeCollection = [];

CanvasManager.addShape = function(element) {
    this.tileLayerShapeCollection.push(element);
};

CanvasManager.addPawn = function(pawnImage){
    this.pawnLayerShapeCollection.push(pawnImage);
}

CanvasManager.render = function() {

    // clear canvas container 
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

    // render shape objects 
    for(var i = 0; i < this.tileLayerShapeCollection.length; i++) {
        this.tileLayerShapeCollection[i].render(this.context);
    }

    for(var i = 0; i < this.pawnLayerShapeCollection.length; i++) {
        this.pawnLayerShapeCollection[i].render(this.context);
    }
};

CanvasManager.creatEventListener = function(callback){
    var listener = {

        toCall: function(){},
        canvas: null,
        handleEvent: function(){}

    }
    listener.toCall = callback;
    listener.canvas = this.canvas;
    listener.handleEvent = function(){
        listener.toCall();
        listener.canvas.removeEventListener('mousedown', listener.handleEvent);
    }

    return listener;
}

CanvasManager.onMouseDown = function(callback) {

    var listener = this.creatEventListener(callback)
    this.canvas.addEventListener('mousedown', listener.handleEvent);
}

CanvasManager.setMousePosition = function(event, canvas){
        var rect = canvas.getBoundingClientRect();
        this.currentMousePosition.x = event.clientX - rect.left;
        this.currentMousePosition.y = event.clientY - rect.top;
}

CanvasManager.onMouseMove = function(callback) {
    this.canvas.addEventListener('mousemove', callback);
};

CanvasManager.onMouseUp = function(callback) {
    var listener = {

        toCall: function(){callback()},
        canvas: null,
        handleEvent: function(){
            toCall();
            canvas.removeEventListener('mousedown', listener.handleEvent)
        }

    }
    listener.canvas = this.canvas;
    this.canvas.addEventListener('mouseup', listener.handleEvent);
};