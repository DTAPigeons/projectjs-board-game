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

var PlayerPawns = function(playerIndex, knightImage = null){
    this.knights=[];
    this.elfs=[];
    this.dwarfs=[];

    //(hitPoints=1,damage=0,defence=0,range=0,speed=0,playerOwner = 0)
    this.knights.push(new Pawn(15,8,3,1,1,playerIndex, knightImage));
    this.knights.push(new Pawn(15,8,3,1,1,playerIndex, knightImage));
    this.elfs.push(new Pawn(10,5,1,3,3,playerIndex, "../../sprites/elf.jpg"));
    this.elfs.push(new Pawn(10,5,1,3,3,playerIndex, "../../sprites/elf.jpg"));
    this.dwarfs.push(new Pawn(12,6,2,2,2,playerIndex, "../../sprites/dwarf.png"));
    this.dwarfs.push(new Pawn(12,6,2,2,2,playerIndex, "../../sprites/dwarf.png"));

    this.hasPawns = (this.knights.lenght>0) || (this.elfs.lenght>0) || (this.dwarfs.lenght>0)
}

Placer.initialize = function(placerId){
    this.placerElement = document.getElementById(placerId);
    this.knightCount = document.getElementById("knight-number");
    this.elfCount = document.getElementById("elf-number");
    this.dwarfCount = document.getElementById("dwarf-number");
    this.knightButton = document.getElementById("knight-button");
    this.elfButton = document.getElementById("elf-button");
    this.dwarfButton = document.getElementById("dwarf-button");
    this.playerOnePawns = new PlayerPawns(1, document.getElementById("knight-img"));
    this.playerTwoPawns = new PlayerPawns(2, document.getElementById("knight-img"));
    Placer.initializeForPlayer(true);
}



Placer.initializeForPlayer = function(isPlayerOne){
    var currentPlayer = isPlayerOne ? this.playerOnePawns : this.playerTwoPawns;
    this.knightCount.innerText = currentPlayer.knights.length;
    this.elfCount.innerText = currentPlayer.elfs.length;
    this.dwarfCount.innerText = currentPlayer.dwarfs.length;
    this.knightButton.addEventListener('click', function(){Placer.selectPawn(currentPlayer.knights)})
}

Placer.selectPawn = function(pawnCollection){
    if(pawnCollection.lenght<=0){return;}
    currentPawn = pawnCollection.pop();
    CanvasManager.onMouseDown(this.placePawn);
}

Placer.placePawn = function(){
    var tile = MapRenderer.getTileOfMousePosition();
    currentPawn.occupyTile(tile);
    currentPawn.initializeImage();
    CanvasManager.addPawn(currentPawn.image);
}