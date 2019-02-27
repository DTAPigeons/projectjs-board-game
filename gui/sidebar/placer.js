var Placer = {};
Placer.placerElement = null;
Placer.knightCount = null;
Placer.elfCount = null;
Placer.dwarfCount = null;
Placer.knightButton = null;
Placer.elfButton = null;
Placer.dwarfButton = null;
Placer.playerOnePawns = null;
Placer.playerTwoPawns = null;
Placer.currentPawn = null;
Placer.isPlayerOne = true;

var PlayerPawns = function(playerIndex, knightImage = null, dwarfImage = null, elfImage = null){
    this.knights=[];
    this.elfs=[];
    this.dwarfs=[];

    //(hitPoints=1,damage=0,defence=0,range=0,speed=0,playerOwner = 0)
    this.knights.push(new Pawn(15,8,3,1,1,playerIndex, knightImage));
    this.knights.push(new Pawn(15,8,3,1,1,playerIndex, knightImage));
    this.elfs.push(new Pawn(10,5,1,3,3,playerIndex, elfImage));
    this.elfs.push(new Pawn(10,5,1,3,3,playerIndex, elfImage));
    this.dwarfs.push(new Pawn(12,6,2,2,2,playerIndex, dwarfImage));
    this.dwarfs.push(new Pawn(12,6,2,2,2,playerIndex, dwarfImage));

    this.hasPawns = function(){ return (this.knights.length>0) || (this.elfs.length>0) || (this.dwarfs.length>0);}
}

Placer.initialize = function(placerId){
    this.placerElement = document.getElementById(placerId);
    this.knightCount = document.getElementById("knight-number");
    this.elfCount = document.getElementById("elf-number");
    this.dwarfCount = document.getElementById("dwarf-number");
    this.knightButton = document.getElementById("knight-button");
    this.elfButton = document.getElementById("elf-button");
    this.dwarfButton = document.getElementById("dwarf-button");
    this.playerOnePawns = new PlayerPawns(1, document.getElementById("knight-img"),document.getElementById("dwarf-img"),document.getElementById("elf-img"));
    this.playerTwoPawns = new PlayerPawns(2, document.getElementById("knight-img"),document.getElementById("dwarf-img"),document.getElementById("elf-img"));
    Placer.initializeForPlayer();
    this.placerElement.style.visibility = "visible";
}



Placer.initializeForPlayer = function(){
    var currentPlayer = this.isPlayerOne ? this.playerOnePawns : this.playerTwoPawns;
    var startCombat = !currentPlayer.hasPawns()
    if(startCombat){
        CombatManager.startCombat();
        this.placerElement.style.visibility = "hidden";
        return;
    }
    Map.setUpPhase(this.isPlayerOne);
    this.knightCount.innerText = currentPlayer.knights.length;
    this.elfCount.innerText = currentPlayer.elfs.length;
    this.dwarfCount.innerText = currentPlayer.dwarfs.length;
    if(currentPlayer.knights.length==0){ this.knightButton.disabled = true;}
    else {
        this.knightButton.disabled = false;
        this.knightButton.addEventListener('click', function(){Placer.selectPawn(currentPlayer.knights)})
    }
    if(currentPlayer.elfs.length==0){ this.elfButton.disabled = true;}
    else {
        this.knightButton.disabled = false;
        this.elfButton.addEventListener('click', function(){Placer.selectPawn(currentPlayer.elfs)})
    }
    if(currentPlayer.dwarfs.lenght==0){ this.dwarfButton.disabled = true;}
    else{
        this.dwarfButton.disabled = false;
        this.dwarfButton.addEventListener('click', function(){Placer.selectPawn(currentPlayer.dwarfs)})}
}

Placer.selectPawn = function(pawnCollection){
    if(pawnCollection.lenght<=0){return;}
    var placePawnEvent = {};
    placePawnEvent.toCall = this.placePawn;
    placePawnEvent.pawnCollection = pawnCollection;
    placePawnEvent.listener = function(){
        placePawnEvent.toCall(placePawnEvent.pawnCollection);
    }
    CanvasManager.onMouseDown(placePawnEvent.listener);
}

Placer.placePawn = function(pawnCollection){
    var tile = MapRenderer.getTileOfMousePosition();
    if(tile.state!="castle"){
        return;
    }
    currentPawn = pawnCollection.pop();
    currentPawn.occupyTile(tile);
    currentPawn.initializeImage();
    if(Placer.isPlayerOne){
        CombatManager.playerPawns[1]++;
    }
    else{
        CombatManager.playerPawns[2]++;
    }
    Placer.isPlayerOne = !Placer.isPlayerOne;
    Placer.initializeForPlayer();
}