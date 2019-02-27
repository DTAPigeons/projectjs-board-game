var Selector = {};
Selector.actionBar = null;
Selector.moveButton = null;
Selector.attackButton = null;
Selector.healButton = null;
Selector.unselectButton = null;
Selector.currentPlayerIndex = 0;
Selector.currentPawn = null;


Selector.initializeForPlayer = function(playerIndex){
    Selector.currentPawn = null;
    this.currentPlayerIndex = playerIndex;
    Selector.clearButtons();
    CanvasManager.onMouseDown(Selector.selectPawn);
}

Selector.clearButtons = function(){
    Selector.actionBar = document.getElementById("actionbar-ui");
    Selector.actionBar.style.visibility = "hidden";
    Selector.moveButton = document.getElementById("move-button");
    Selector.attackButton = document.getElementById("attack-button");
    Selector.healButton = document.getElementById("heal-button");
    Selector.unselectButton = document.getElementById("unselect-button");
    var moveButton = Selector.moveButton.cloneNode(true);
    Selector.moveButton.parentNode.replaceChild(moveButton, Selector.moveButton);
    var attackButton = Selector.attackButton.cloneNode(true);
    Selector.attackButton.parentNode.replaceChild(attackButton, Selector.attackButton);
    var healButton = Selector.healButton.cloneNode(true);
    Selector.healButton.parentNode.replaceChild(healButton, Selector.healButton);
    Selector.actionBar = document.getElementById("actionbar-ui");
    Selector.actionBar.style.visibility = "hidden";
    Selector.moveButton = document.getElementById("move-button");
    Selector.attackButton = document.getElementById("attack-button");
    Selector.healButton = document.getElementById("heal-button");
    Selector.unselectButton = document.getElementById("unselect-button");

}

Selector.selectPawn = function(){
    var newPawn = MapRenderer.getTileOfMousePosition().occupant;
    if(newPawn!=null && newPawn.playerOwner == Selector.currentPlayerIndex){
        Selector.actionBar.style.visibility = "visible";
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
    var selectAttack = Selector.creatPawnListener(pawn, AttackManager.enter);
    if(!AttackManager.canAttack(pawn)){
        Selector.attackButton.disabled = true;
        return;
    
    }
    Selector.attackButton.disabled = false;
    Selector.attackButton.addEventListener('click', selectAttack);
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
