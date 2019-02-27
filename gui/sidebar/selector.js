var Selector = {};
Selector.actionBar = null;
Selector.moveButton = null;
Selector.attackButton = null;
Selector.healButton = null;
Selector.unselectButton = null;
Selector.currentPlayerIndex = 0;
Selector.currentPawn = null;

Selector.initializeForPlayer = function(playerIndex){
    this.currentPlayerIndex = playerIndex;
    CanvasManager.onMouseDown(Selector.selectPawn);
    Selector.actionBar = document.getElementById("actionbar-ui");
}

Selector.selectPawn = function(){
    var newPawn = MapRenderer.getTileOfMousePosition().occupant;
    if(newPawn!=null){
        Selector.actionBar.style.visibility = "visible";
        Selector.moveButton = document.getElementById("move-button");
        Selector.attackButton = document.getElementById("attack-button");
        Selector.healButton = document.getElementById("heal-button");
        Selector.unselectButton = document.getElementById("unselect-button");
        Selector.setActionbar(newPawn);
    }
    else{
        Selector.actionBar.style.visibility = "hidden";
        CanvasManager.onMouseDown(Selector.selectPawn);
    }
}

Selector.setActionbar = function(pawn){
    if(pawn.playerOwner == Selector.currentPlayerIndex){
        Selector.setActionbarForCurrentPlayer(pawn);
    }
    else{

    }

    Selector.unselectButton.addEventListener('click', Selector.unselect);
}

Selector.setActionbarForCurrentPlayer = function(pawn){
    var selectMove = Selector.creatPawnListener(pawn, MovementManager.enter);
    Selector.moveButton.addEventListener('click', selectMove);
}

Selector.creatPawnListener = function(pawn, toCall){
    var listener = {
        pawn: null,
        toCall: function(){},
        handleEvent: function(){}
    }
    listener.pawn = pawn;
    listener.tocall = toCall;
    listener.handleEvent = function(){
        toCall(pawn);
    }

    return listener.handleEvent;
}

Selector.unselect = function(){
    Selector.currentPawn = null;
    CanvasManager.onMouseDown(Selector.selectPawn);
    CanvasManager.clearOverlay();
}