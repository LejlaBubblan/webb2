// Globala Variabler
var tempNrs;  //Global variabel för siffrorna.
var newTilesBtn; // Variabel för knappen till nya brickor.
var newGameBtn; // Variabel för knappen till nytt spel.
var emptyTile; // Variabel för tom ruta.
var boardTiles; // Variabel för brickorna på spelplanen.
var thisTile; // Variabel för element som ska dras.
var countTiles; // Variabel som ska räkna hur många nya brickor som framställts.
var filledTiles; //Referens när spelplanen är fylld.



const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]; //Konstant för siffrorna

// Slut globala variabler


// Start init
function init() { //Referenser till de olika elementen som ska vara aktiva från att man startar webbsidan och köras under hela användningen.
    newGameBtn = document.getElementById("newGameBtn");
    newGameBtn.addEventListener("click", newGame);
    newTilesBtn = document.getElementById("newTilesBtn");
    newTilesBtn.disabled = true;
    emptyTile = document.getElementById("newTiles").getElementsByTagName("div");
    boardTiles = document.getElementById("board").getElementsByClassName("empty");
    filledTiles = document.getElementById("board").getElementsByClassName("tile");
    for (let i = 0; i < emptyTile.length; i++) {
        emptyTile[i].addEventListener("dragstart", moveTiles);
        emptyTile[i].addEventListener("dragend", dropTile);
    }
    loadGame();
} 
window.addEventListener("load", init);
//Slut init

function newGame() { // Funktion för att köra nytt spel
    for (let i = 0; i < filledTiles.length; i++) {
        filledTiles[i].classList.remove("filled");
        filledTiles[i].classList.add("empty");
        filledTiles[i].innerHTML = "";
    } //Loop för att ändra på klasserna för brickorna om den är fylld eller tom, så att om de är ex. fyllda från förgående spel ska de bli tomma igen.

    tempNrs = tiles.slice(0); // Kod för att få kopia av arrayen i sifforna. 
    newGameBtn.disabled = true;
    newTilesBtn.disabled = false;
    //Vid startat spel är startknappen icke funktionell och knappen för nya brickor 

    newTilesBtn.addEventListener("click", newTiles); // En anropning för att få nya brickor vid klick på knappen.
    countTiles = 0; // Referens till att det ska börja om från 0 på räkning av brickorna. 
} // Slut på newGame.

function newTiles() { // Funktion som producerar nya brickor
    let tileBox = []; //Variabel som ska fylla tomma rutorna med siffror
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(tempNrs.length * Math.random()); // Variabel som slumpar brickor
        let ix = tempNrs[r] - 1; //Variabel för slumpat nummer och sparar det i ix
        tileBox.push(tiles[ix]); //Kod för att få fram nya brickor från tiles.
        tempNrs.splice(r, 1); // Kod för att samma nummer inte ska kunna dyka upp fler gånger under spelets gång. 

    }

    for (let i = 0; i < emptyTile.length; i++) {
        emptyTile[i].innerHTML = tileBox[i];
        emptyTile[i].classList.remove("empty");
        emptyTile[i].classList.add("filled");
        emptyTile[i].draggable = true;
    } // Loop för att programmet ska kunna ändra de tomma brickorna till fyllda och bli dragbara. 

    newTilesBtn.disabled = true; // Knappen för nya brickor kan inte tryckas på förens alla fyra brickorna är borta.
} // Slut på newTiles.

function moveTiles(e) { // Funktion som tillåter att dra brickorna
    thisTile = this; //Kod för att specifiera "thisTile".
    e.dataTransfer.setData("text", thisTile.innerHTML); // Kod för att överföra den specifika datan(nummer).

    for (let i = 0; i < boardTiles.length; i++) {
        boardTiles[i].addEventListener("dragover", dropTile);
        boardTiles[i].addEventListener("drop", dropTile);
        boardTiles[i].addEventListener("dragleave", dropTile);

    } // Loop för att anropa att det ska gå att hämta och lämna brickorna på spelplanen.

}

function dropTile(e) { //Funktion som hanterar "drop" funktionen, 
    e.preventDefault(); // Kod som gör att du kan släppa brickorna på spelplanen.

    if (e.type == "dragover") {
        this.style.backgroundColor = "#e50";
    } //Om brickan hålls över spelplanen ska färgen ändras till orange.

    else if (e.type = "dragleave") {
        this.style.backgroundColor = "";
    } //Vid förflyttning av en bricka från tiles ska bakgrund

    if (e.type == "drop") {
        for (let i = 0; i < boardTiles.length; i++) {
            boardTiles[i].removeEventListener("dragover", dropTile);
            boardTiles[i].removeEventListener("drop", dropTile);
        } // Ska endast gå att droppa brickan antingen på spelplanen eller ska den droppas tillbaka.

        let drop = e.dataTransfer.getData("text"); //Referens för vilken data (nummer) som hämtas när brickan släpps.
        this.classList.remove("empty"); // Ta bort tom ruta.
        this.classList.add("filled") // Lägger till fylld ruta.
        this.style.backgroundColor = ""; // Ingen bakgrundsfärg.
        this.innerHTML = drop;
        thisTile.innerHTML = "";
        thisTile.classList.remove("filled");
        thisTile.classList.add("empty");
        thisTile.draggable = false; // Inte kunna dra i brickan efter den är släppt på spelplanen.

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

    } // Kod för att det ska räkna hur många brickor ska komma fram dock max 16 under ett spel, och att man inte ska kunna trycka fram nya brickor förens det är tomt. 
}
