var MovementManager = {};
MovementManager.currentPawn = null;

MovementManager.enter = function(pawn){
    MovementManager.currentPawn = pawn;
    var movementArea = PathFinding.getArea(pawn.tileOccupied, pawn.speed);
    SelectionGrid.show(movementArea,MovementManager.movePawn);
}

MovementManager.movePawn = function(newTile){
    if(MovementManager.currentPawn==null){throw "No pawn selected";}
    MovementManager.currentPawn.occupyTile(newTile);
    CombatManager.turnEnded(MovementManager.currentPawn.playerOwner);
    MovementManager.currentPawn = null;
}