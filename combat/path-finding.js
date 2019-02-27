var PathFinding = {};

PathFinding.getArea = function(startPosition, range){

    var area = [];
    var openList = [startPosition];

    for(var i=0; i<=range; i++){
        for(var j=openList.length-1; j>=0; j--){
            var nextNode = openList[j];

            openList.splice(j,1);

            if(nextNode.occupied() && nextNode!= startPosition){ continue; }

            if(nextNode!= startPosition) {area.push(nextNode);}

            var neighbours = Map.getNeighboursOfTile(nextNode);

            neighbours.forEach(neighbour => {

                if(!neighbour.occupied() && !area.includes(neighbour) && !openList.includes(neighbour)) {
                    openList.push(neighbour);
                }
            });

        }        
    }

    return area;
}