var CombatManager = {}
CombatManager.playerOnePawns  = [];
CombatManager.playerTwoPawns = [];
CombatManager.playerScores = [0,0,0];
CombatManager.playerPawns = [0,0,0];
CombatManager.currentPlayerIndex = 0;
CombatManager.playerOneScoreText = null;
CombatManager.playerTwoScoreText = null;

CombatManager.startCombat = function(){
    CombatManager.playerOneScoreText = document.getElementById("player-one-score");
    CombatManager.playerTwoScoreText = document.getElementById("player-two-score");
    this.currentPlayerIndex =1;
    Map.startCombat();
    Selector.initializeForPlayer(this.currentPlayerIndex);
}

CombatManager.turnEnded = function(){
    CombatManager.playerOneScoreText.innerText = CombatManager.playerScores[1];
    CombatManager.playerTwoScoreText.innerText = CombatManager.playerScores[2];
    if(this.currentPlayerIndex==1){
        this.currentPlayerIndex = 2;
    }
    else{
        this.currentPlayerIndex =1;
    }

    if(this.playerPawns[this.currentPlayerIndex]>0){
        Selector.initializeForPlayer(this.currentPlayerIndex);
    }

    else{
        this.gameOver();
    }
}

CombatManager.pawnTookDamage = function(playerOwner,damage){
    if(playerOwner==1){
        this.playerScores[2]+=damage;
    }
    else{
        this.playerScores[1]+=damage;
    }
}

CombatManager.pawnDied = function(playerOwner){
    this.playerPawns[playerOwner]--;
}

CombatManager.gameOver = function(){
    console.log("Game over!");
}