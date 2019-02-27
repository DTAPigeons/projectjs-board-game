var SelectionGrid = {};

var OverlayArea = function(areaToOverlay){
    this.overlay = [];
    this.getmouseOnTile = function(){
        var hoveredTile = MapRenderer.getTileOfMousePosition();
        var elementIndex = this.overlay.findIndex(element=> element.tile == hoveredTile);
        if(elementIndex>-1){
            return this.overlay[elementIndex].tile;
        }
        return null;
    }
    areaToOverlay.forEach(tile => {
        var newShape = MapRenderer.creatShapeForTile(tile.x,tile.y,"green");
        var overlayItem = { 
            tile : null,
            shape : null
        }
        overlayItem.tile = tile;
        overlayItem.shape = newShape;
        this.overlay.push(overlayItem);
        if(tile.occupant!=null && tile.occupant.playerOwner==0) return;
        CanvasManager.addToOverlay(newShape);
    });
}

SelectionGrid.show = function(area, toExecute){
    var listener = {
        toCall: function(){},
        overlayArea: null,
        handleEvent : function(){}
    }

    listener.toCall = toExecute;
    listener.overlayArea = new OverlayArea(area);
    listener.handleEvent = function(){
        var tile = listener.overlayArea.getmouseOnTile();
        if(tile!=null){
            listener.toCall(tile);           
        }

        CanvasManager.clearOverlay();
    }

    CanvasManager.onMouseDown(listener.handleEvent);
}