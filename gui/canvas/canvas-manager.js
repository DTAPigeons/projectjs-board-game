var CanvasManager = {};

CanvasManager.canvas    = null; 
CanvasManager.context   = null;
CanvasManager.currentMousePosition   = {x:0,y:0};
CanvasManager.currentMouseDownListener = null;

CanvasManager.initialize = function(element) {
    this.canvas = document.getElementById(element);
    this.context = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', function(event){ CanvasManager.setMousePosition(event, CanvasManager.canvas)});
};

// Contains all shapes of the canvas application
CanvasManager.tileLayerShapeCollection = [];
CanvasManager.overlayLayerShapeCollection = [];
CanvasManager.pawnLayerShapeCollection = [];

CanvasManager.addShape = function(element) {
    this.tileLayerShapeCollection.push(element);
};

CanvasManager.addToOverlay = function(element){
    this.overlayLayerShapeCollection.push(element);
}

CanvasManager.clearOverlay = function(){
    this.overlayLayerShapeCollection = [];
}

CanvasManager.addPawn = function(pawnImage){
    this.pawnLayerShapeCollection.push(pawnImage);
}

CanvasManager.render = function() {

    // clear canvas container 
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

    // render tiles 
    for(var i = 0; i < this.tileLayerShapeCollection.length; i++) {
        this.tileLayerShapeCollection[i].render(this.context);
    }

    // render overlay
    for(var i = 0; i < this.overlayLayerShapeCollection.length; i++) {
        this.overlayLayerShapeCollection[i].render(this.context);
    }

    // render pawns objects
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
        CanvasManager.currentMouseDownListener = null;
    }

    return listener;
}

CanvasManager.onMouseDown = function(callback) {
    if(this.currentMouseDownListener!=null){
        this.canvas.removeEventListener('mousedown', this.currentMouseDownListener);
    }
    var listener = this.creatEventListener(callback);
    this.currentMouseDownListener = listener.handleEvent;
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

/*
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
*/