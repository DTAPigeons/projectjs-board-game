var AttackManager = {}
AttackManager.currentPawn = null;

AttackManager.enter = function(pawn){
    AttackManager.currentPawn = pawn;
    if(!AttackManager.canAttack(pawn)){
        return;
    }
    var attackArrea = AttackManager.generateAttackArea(pawn);
    SelectionGrid.show(attackArrea,AttackManager.attackTarget);
}

AttackManager.generateAttackArea = function(pawn){
    var range = pawn.range;
    var start = pawn.tileOccupied;

    return Map.getAttackArea(start.x,start.y,range);
}

AttackManager.canAttack = function(pawn){
    var attackArea = AttackManager.generateAttackArea(pawn);
    var isValidTarget = function(tile) { return tile.occupant!=null && tile.occupant.playerOwner!=pawn.playerOwner }
    var enemyIndex = attackArea.findIndex(isValidTarget);

    return enemyIndex>-1;
}

AttackManager.attackTarget = function(tile){
    if(AttackManager.currentPawn==null){ return;}
    if(tile.occupant==null){ return;}
    
    tile.occupant.takeDamage(AttackManager.currentPawn.damage);

    CombatManager.turnEnded(AttackManager.currentPawn.playerOwner);

    AttackManager.currentPawn = null;
}