"use strict";
var xPos, yPos;

var mapGrid = document.getElementById("map");

function addTile(tileValue, tileId) {

   let newTile = document.createElement("div");
   newTile.id = tileId;
   newTile.classList.add("block");

   if(tileValue === "W"){
       newTile.classList.add("tile-wall");
   }
   else if(tileValue === "B"){
       newTile.classList.add("entity-block");
   }
   else if(tileValue === "P") {
       newTile.classList.add("entity-player");
   }
   else if(tileValue === "G"){
       newTile.classList.add("tile-goal");
   }
   else{
       newTile.classList.add("tile-space");
   }

   mapGrid.appendChild(newTile);

}

function createGrid(){

    let map = tileMap01.mapGrid;

    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            let id = "x" + i + "y" + j;
            let value = map[i][j][0];
            addTile(value, id);
        }
    }

}

function arrowKeys(){
    /**check if key pressed was arrow
     * if true run movePlayer(xPosChange, yPosChange)
     */
}

function movePlayer(xPosChange, yPosChange){

}



