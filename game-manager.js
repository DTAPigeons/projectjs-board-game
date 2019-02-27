var canvas = document.getElementById("canvas");
Map.initialize(9,7);
CanvasManager.initialize("canvas");
MapRenderer.initialize();
//Placer.initialize();
var testPawn = new Pawn(10,5,1,3,3,1, document.getElementById("elf-img"));
var testOpponent = new Pawn(10,5,1,3,3,2, document.getElementById("elf-img"));
testPawn.occupyTile(Map.tiles[5][1]);
testPawn.initializeImage();
testOpponent.occupyTile(Map.tiles[2][1]);
testOpponent.initializeImage();
Map.startCombat();
CanvasManager.render();
/*var timer = 0;
var waitTime = 10;
*/
Selector.initializeForPlayer(1);

var update = function(){
    CanvasManager.render();
   /* timer++;
    console.log(timer);
    if(timer==waitTime){
        MovementManager.enter(testPawn);
        MovementManager.movePawn(Map.tiles[1][1]);
    }*/
}

var interval = setInterval(update, 100);
