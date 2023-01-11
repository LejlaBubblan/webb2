// Globala Variabler
var tempNrs;  //Global variabel för siffrorna
var newTilesBtn; // Variabel för nya brickor knappen
var newGameBtn; // Variabel för starta spelet knappen
var emptyTile; // Variabel för tom ruta
var boardTiles; // Variabel för brickorna på spelplanen
var thisTile; // Variabel för element som ska dras
var countTiles; // Variabel som räknar hur många gånger nya brickor genererats
var filledTiles; //Referens när spelplanen är fylld
var savedGameRounds; //Referens till antal spel spelade
var startGame = 0; //Referens till antal spel man spelat


const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]; //Konstant för siffrorna

// Slut globala variabler


// Start init
function init() {
    newGameBtn = document.getElementById("newGameBtn");
    newGameBtn.addEventListener("click", newGame);
    newTilesBtn = document.getElementById("newTilesBtn");
    newTilesBtn.disabled = true;
    emptyTile = document.getElementById("newTiles").getElementsByTagName("div");
    boardTiles = document.getElementById("board").getElementsByClassName("empty");
    filledTiles = document.getElementById("board").getElementsByClassName("tile");
    savedGameRounds = document.getElementById("countGames");
    for (let i = 0; i < emptyTile.length; i++) {
        emptyTile[i].addEventListener("dragstart", moveTiles);
        emptyTile[i].addEventListener("dragend", dropTile);
    }
    loadGame();
} //Referenser till de olika elementen som ska vara aktiva från 
window.addEventListener("load", init);
//Slut init

function newGame() { // Funktion för att initiera nytt spel
    for (let i = 0; i < filledTiles.length; i++) {
        filledTiles[i].classList.remove("filled");
        filledTiles[i].classList.add("empty");
        filledTiles[i].innerHTML = "";
    }

    tempNrs = tiles.slice(0); // Kod för att få kopia av arrayen i sifforna. 
    newGameBtn.disabled = true;
    newTilesBtn.disabled = false;
    newTilesBtn.addEventListener("click", newTiles);
    countTiles = 0;
    startGame++;
    savedGameRounds.innerHTML = startGame;
}

function newTiles() { // Funktion som genererar nya brickor
    let tileBox = []; //Variabel som ska fylla tomma rutorna med siffror
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(tempNrs.length * Math.random()); // Variabel som slumpar brickor
        let ix = tempNrs[r] - 1; //Variabel för slumpat nummer och sparar det i ix
        tileBox.push(tiles[ix]);
        tempNrs.splice(r, 1); // Kod för att samma nummer inte ska kunna dyka upp fler gånger under spelets gång. 

    }

    newTilesBtn.disabled = true;

    for (let i = 0; i < emptyTile.length; i++) {
        emptyTile[i].innerHTML = tileBox[i];
        emptyTile[i].classList.remove("empty");
        emptyTile[i].classList.add("filled");
        emptyTile[i].draggable = true;
    }
}

function moveTiles(e) { // Funktion som tillåter att dra nya brickorna
    thisTile = this;
    e.dataTransfer.setData("text", thisTile.innerHTML);

    for (let i = 0; i < boardTiles.length; i++) {
        boardTiles[i].addEventListener("dragover", dropTile);
        boardTiles[i].addEventListener("drop", dropTile);
        boardTiles[i].addEventListener("dragleave", dropTile);

    }

}

function dropTile(e) { //Funktion som hanterar "drop" funktionen, alltså tillåter att brickorna släpps över spelplanen
    e.preventDefault();

    if (e.type == "dragover") {
        this.style.backgroundColor = "#e50000";
    }

    else if (e.type = "dragleave") {
        this.style.backgroundColor = "";
    }

    if (e.type == "drop") {
        for (let i = 0; i < boardTiles.length; i++) {
            boardTiles[i].removeEventListener("dragover", dropTile);
            boardTiles[i].removeEventListener("drop", dropTile);
        }

        let drop = e.dataTransfer.getData("text"); //Referens för vilken data (nummer) som hämtas när brickan släpps
        this.classList.remove("empty");
        this.classList.add("filled")
        this.style.backgroundColor = "";
        this.innerHTML = drop;
        thisTile.innerHTML = "";
        thisTile.classList.remove("filled");
        thisTile.classList.add("empty");
        thisTile.draggable = false;

        countTiles++;
        if (countTiles == 16) {
            newTilesBtn.disabled = true;
            newGameBtn.disabled = false;
        }

        else if (countTiles == 4) {
            newTilesBtn.disabled = false;
        }

        else if (countTiles == 8) {
            newTilesBtn.disabled = false;
        }

        else if (countTiles == 12) {
            newTilesBtn.disabled = false;
        }

    }
}
