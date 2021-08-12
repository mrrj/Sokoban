"use strict";

var playerXPos, playerYPos;

var mapGrid = document.getElementById("map");

window.addEventListener("keydown", arrowKeys);

function addTile(tileValue, xPos, yPos) {

   let newTile = document.createElement("div");
   let tileId = "x" + xPos + "y" + yPos;
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
       playerXPos = xPos;
       playerYPos = yPos;
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
            let value = map[i][j][0];
            addTile(value, j, i);
        }
    }

}

function arrowKeys(e){
    console.log("running arrowKeys");

    let arrow = e.keyCode;

    switch(arrow){
        //left arrow
        case 37:
            e.preventDefault();
            movePlayer(-1,0);
            break;
        //up arrow    
        case 38:
            e.preventDefault();
            movePlayer(0,-1);
            break;
        //right arrow
        case 39:
            e.preventDefault(); 
            movePlayer(1,0);
            break;
        //down arrow
        case 40:
            e.preventDefault();
            movePlayer(0,1);
            break;
        default:
            break;

    }
}

function movePlayer(xPosChange, yPosChange){

    let currentElementId = "x" + playerXPos + "y" + playerYPos;
    let currentElement = document.getElementById(currentElementId);
    currentElement.classList.replace("entity-player", "tile-space");

    playerXPos += xPosChange;
    playerYPos += yPosChange;

    let elementToId = "x" + playerXPos + "y" + playerYPos;
    let elementTo = document.getElementById(elementToId);   
    elementTo.classList.replace("tile-space", "entity-player");

    /**TODO:
     * update css for currentElement and elementTo
     * also what if player moves a block?
     * 
     * playerCanMove(class of elementTo)
     */

}

function playerCanMove(elementCLass){

}



