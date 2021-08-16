"use strict";

var playerXPos, playerYPos;
var currentElementClass = "tile-space";

var mapGrid = document.getElementById("map");

window.addEventListener("keydown", arrowKeys);

function addTile(tileValue, xPos, yPos) {

    let newTile = document.createElement("div");
    let tileId = "x" + xPos + "y" + yPos;
    newTile.id = tileId;

    if (tileValue === "W") {
        newTile.classList.add(Tiles.Wall);
    }
    else if (tileValue === "B") {
        newTile.classList.add(Entities.Block);
    }
    else if (tileValue === "P") {
        newTile.classList.add(Entities.Character);
        playerXPos = xPos;
        playerYPos = yPos;
    }
    else if (tileValue === "G") {
        newTile.classList.add(Tiles.Goal);
    }
    else {
        newTile.classList.add(Tiles.Space);
    }

    mapGrid.appendChild(newTile);

}

function createGrid() {

    let map = tileMap01.mapGrid;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let value = map[i][j][0];
            addTile(value, j, i);
        }
    }

}

function arrowKeys(e) {
    console.log("running arrowKeys");

    let arrow = e.keyCode;

    switch (arrow) {
        //left arrow
        case 37:
            e.preventDefault();
            movePlayer(-1, 0);
            break;
        //up arrow    
        case 38:
            e.preventDefault();
            movePlayer(0, -1);
            break;
        //right arrow
        case 39:
            e.preventDefault();
            movePlayer(1, 0);
            break;
        //down arrow
        case 40:
            e.preventDefault();
            movePlayer(0, 1);
            break;
        default:
            break;

    }
}


//return true if player moves, false otherwise
function movePlayer(xPosChange, yPosChange) {


    let currentElementId = "x" + playerXPos + "y" + playerYPos;
    let currentElement = document.getElementById(currentElementId);

    let nextElement = getNextElement(xPosChange, yPosChange);

    let nextElementClass = nextElement.className;

    if (nextElement.classList.contains("tile-space") ||
           nextElement.classList.contains("tile-goal")){
        nextElement.classList.replace(nextElementClass,"entity-player");
        currentElement.classList.replace("entity-player", currentElementClass);
    }

    else if (nextElement.classList.contains("entity-block")) {
        nextElementClass = "tile-space";

        let nextBlockPosition = getNextElement(2*xPosChange,2*yPosChange);
        let nextBlockPositionClass = nextBlockPosition.className;
        let entityClass = nextElement.className;

        if(nextBlockPosition.classList.contains("tile-space")){
            nextBlockPosition.classList.replace(nextBlockPositionClass,entityClass);
            nextElement.classList.replace(entityClass,"entity-player");
            currentElement.classList.replace("entity-player", currentElementClass);
        }
        else if(nextBlockPosition.classList.contains("tile-goal")){
            nextBlockPosition.classList.replace("tile-goal","entity-block-goal");
            nextElement.classList.replace("entity-block","entity-player");
            currentElement.classList.replace("entity-player", currentElementClass);
        }
        else {
            return false;
        }   
    }
    else if(nextElement.classList.contains("entity-block-goal")){
        nextElementClass = "tile-goal";

        let nextBlockPosition = getNextElement(2*xPosChange,2*yPosChange);

        if(nextBlockPosition.classList.contains("tile-space")){
            nextBlockPosition.classList.replace("tile-space","entity-block");
            nextElement.classList.replace("entity-block-goal","entity-player");
            currentElement.classList.replace("entity-player", currentElementClass);
        }
        else if(nextBlockPosition.classList.contains("tile-goal")){
            nextBlockPosition.classList.replace("tile-goal","entity-block-goal");
            nextElement.classList.replace("entity-block-goal","entity-player");
            currentElement.classList.replace("entity-player", currentElementClass);
        }
        else {
            return false;
        }    

    }
    else return false;

    playerXPos += xPosChange;
    playerYPos += yPosChange;
    currentElementClass = nextElementClass;
    return true;

}


function getNextElement(xPosChange, yPosChange) {

    let currentXPos = playerXPos;
    let currentYPos = playerYPos;

    let nextPlayerXPos = currentXPos += xPosChange;
    let nextPlayerYPos = currentYPos += yPosChange;

    let nextElementId = "x" + nextPlayerXPos + "y" + nextPlayerYPos;
    let nextElement = document.getElementById(nextElementId);

    return nextElement;

}

