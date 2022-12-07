// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt
var selectedWord;//Referens till det valda ordet.
var letterBoxes;//Referens till boxarna bokstäverna ska hamna.
var hangmanImg; //Referens till image.
var msgElem //Div-elementet
var startGameBtn;//Referens till startknappen.
var letterButtons;//Refenser till bokstavs-knapparna
var startTime;//Referens till starttiden.

// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd

// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    //Referens för startknappen till spelet.
    startGameBtn = document.getElementById("startGameBtn");
    startGameBtn.onclick = startGame;
    //Referens för att kunna använda bokstavs-knapparna. 
    letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].onclick = guessLetter;
    //Referenser till bilder.
    hangmanImg = document.getElementById("hangman");
    msgElem = document.getElementById("message");
    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = true;
} // Slut init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

//Funktionen i början av spelet så allt är "tomt", samt starttid ska startas när man trycker på startknappen.
function startGame() {
    randomWord();
    showLetterBoxes();
    hangmanImg.src = "img/h0.png";
    hangmanNr = 0;
    startGameBtn.disabled = true;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = false;
    msgElem.innerHTML = "";
    let now = new Date();
    startTime = now.getTime();
}//Slut på starGame

//Funktionen för att få fram slumpmässiga ord från wordlist.
function randomWord() {
    let oldWord = selectedWord;
    while (oldWord == selectedWord) {
        let ix = Math.floor(wordList.length * Math.random());
        selectedWord = wordList[ix];
    }
}// Slut på randomWord-funktionen.

//Funktionen för att få fram boxar för de olika orden.
function showLetterBoxes() {
    let newCode = ("");
    for (let i = 0; i < selectedWord.length; i++)
        newCode += "<span>&nbsp;</span>";
    document.getElementById("letterBoxes").innerHTML = newCode;
    letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}//Slut på showLetterBoxes-funktionen.

//Funktion för att koppla bokstäverna med det man gissar på samt få bilder ifall man gissar fel.
function guessLetter() {
    this.disabled = true;
    let letter = this.value;
    let letterFound = false;
    correctLettersCount = 0;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord.charAt(i) == letter) {
            letterBoxes[i].innerHTML = letter;
            letterFound = true;
        }

        if (letterBoxes[i].innerHTML != "&nbsp;") {
            correctLettersCount++;
        }
        if (correctLettersCount == selectedWord.length) {
            endGame(false);
        }
    }

    if (letterFound == false) {
        hangmanNr++;
        hangmanImg.src = "img/h" + hangmanNr + ".png";
        if (hangmanNr == 6) {
            endGame(true);
        }

    }
}//Slut på guessLetter-funktionen.

//Funktion för att veta att spelet är klart, antingen om du klarat det eller inte. Meddelande för rätt svar vid gameover, Hur många sekunder det tog under spelets gång. 
function endGame(manHanged) {
    let runTime = (new Date().getTime() - startTime) / 1000;
    if (manHanged == true) {
        msgElem.innerHTML = "Gubben hängdes, rätt ord var " + selectedWord;
    }
    else if (manHanged == false) {
        msgElem.innerHTML = "Grattis du hade rätt! ";
    }

    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = true;
    msgElem.innerHTML += "<br>Det tog " + runTime.toFixed(1) + " sekunder.";
} //Slut på endGame-funktionen.