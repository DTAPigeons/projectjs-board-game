var canvas = document.getElementById("canvas");
Map.initialize(9,7);
CanvasManager.initialize("canvas");
MapRenderer.initialize();
Placer.initialize();
CanvasManager.render();

var update = function(){
    CanvasManager.render();
}

var interval = setInterval(update, 100);
