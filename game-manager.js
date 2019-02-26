var canvas = document.getElementById("canvas");
var map = new Map(9,7);
CanvasManager.initialize("canvas");
MapRenderer.initialize(map);
CanvasManager.render();
