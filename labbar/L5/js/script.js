// Globala konstanter och variabler
var boardElem;			// Referens till div-element för "spelplanen"
const allCarImgs = [
	[], // Inga bilar för index 0
	["ferrari_up.png", "ferrari_right.png", "ferrari_down.png", "ferrari_left.png"],
	["jeep_up.png", "jeep_right.png", "jeep_down.png", "jeep_left.png"],
	["vw_up.png", "vw_right.png", "vw_down.png", "vw_left.png"]
];
var carImgs;			// Array med vald bil (någon av ovanstående arrayer)
// Array med filnamn för bilderna med bilen
var carDir = 1;			// Riktning för bilen, index till carImgs
var carElem;			// Referens till img-element för bilen
const xStep = 5;		// Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5;		// eller y-led i varje steg
const timerStep = 20;	// Tid i ms mellan varje steg i förflyttningen
var timerRef = null;	// Referens till timern för bilens förflyttning
var startBtn;			// Referens till startknappen
var stopBtn;			// Referens till stoppknappen
var carMenu;			// Referens till menyn för att välja bil

/* ===== Tillägg i labben ===== */
var pigElem; //Referens till vildsvinet.
var pigTimerRef = null; // Referens till timern för startat spel på vildsvinen.
const pigDuration = 2000; // Referens till hur många sekunder mellan de olika vildsvinen dyker upp.
var pigNr; // Referens till hur många vildsvin som ska dyka upp under ett spel.
var hitCounter; // Referens för beräkningen av hur många vildsvin man träffat.
var pigNrElem; // Element för räkningen på antal vildsvin som dykt upp.
var hitCounterElem; // Element för räkningen på antal vildsvin man krockat med.
var catchedPig; // Referens till ifall vildsvinet blivit påkört.
// --------------------------------------------------
// Bilderna laddas in i förväg, så att alla bilder finns i webbläsarens cache, när de behövs
for (let i = 0; i < allCarImgs.length; i++) {
	for (let j = 0; j < allCarImgs[i].length; j++) {
		let img = new Image();
		img.src = "img/" + allCarImgs[i][j];
	}
}
{ // Förladda "smack"-bilden
	let img = new Image();
	img.src = "img/smack.png";
}
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
	// Referenser till element i gränssnittet
	boardElem = document.getElementById("board");
	carElem = document.getElementById("car");
	startBtn = document.getElementById("startBtn");
	stopBtn = document.getElementById("stopBtn");
	carMenu = document.getElementById("carMenu");
	// Lägg på händelsehanterare
	document.addEventListener("keydown", checkKey);
	// Känna av om användaren trycker på tangenter för att styra bilen
	startBtn.addEventListener("click", startGame);
	stopBtn.addEventListener("click", stopGame);
	carMenu.addEventListener("change", chooseCar);
	// Aktivera/inaktivera knappar
	startBtn.disabled = false;
	stopBtn.disabled = true;
	carMenu.disabled = false;
	// Första bil
	carImgs = allCarImgs[1];
	carElem.src = "img/" + carImgs[carDir];

	/* === Tillägg i labben === */
	pigElem = document.getElementById("pig"); 
	pigNrElem = document.getElementById("pigNr");
	hitCounterElem = document.getElementById("hitCounter"); 
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) { // Anropas vid keydown
	let k = e.key;
	switch (k) {
		case "ArrowLeft":
		case "z":
			e.preventDefault();
			carDir--; // Bilens riktning 90 grader åt vänster
			if (carDir < 0) carDir = 3;
			carElem.src = "img/" + carImgs[carDir];
			break;
		case "ArrowRight":
		case "-":
			e.preventDefault();
			carDir++; // Bilens riktning 90 grader åt höger
			if (carDir > 3) carDir = 0;
			carElem.src = "img/" + carImgs[carDir];
			break;
	}
} // Slut checkKey
// --------------------------------------------------
// Val av bil genom menyn. Array med valda bildfiler läggs in i carImgs
function chooseCar() {
	carImgs = allCarImgs[this.selectedIndex];
	carElem.src = "img/" + carImgs[carDir];
	this.selectedIndex = 0;
} // Slut chooseCar
// --------------------------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	carMenu.disabled = true;
	document.activeElement.blur(); // Knapparna sätts ur focus, så att webbsidan kommer i fokus igen
	// Detta behövs för att man ska kunna känna av händelsen keydown i Firefox.
	carElem.style.left = "0px";
	carElem.style.top = "0px";
	carDir = 1;
	carElem.src = "img/" + carImgs[carDir];
	moveCar();

	/* === Tillägg i labben === */
	
	pigNr = 0;
	hitCounter = 0;
	pigNrElem.innerHTML = 0;
	hitCounterElem.innerHTML = 0;
	pigTimerRef = setTimeout(newPig, pigDuration);
	catchedPig = true; 
	// Referenser till de olika funktionerna vid startat spel.
} // Slut startGame
// --------------------------------------------------
// Stoppa spelet
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	startBtn.disabled = false;
	stopBtn.disabled = true;
	carMenu.disabled = false;

	/* === Tillägg i labben === */
	if (pigTimerRef != null) clearTimeout(pigTimerRef);
	pigElem.style.visibility = "hidden";
	// Referenser till att timern ska stoppas och ställas om, samt att inga vildsvin ska visas.
} // Slut stopGame
// --------------------------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	let xLimit = boardElem.offsetWidth - carElem.offsetWidth;
	let yLimit = boardElem.offsetHeight - carElem.offsetHeight;
	let x = parseInt(carElem.style.left);	// x-koordinat (left) för bilen
	let y = parseInt(carElem.style.top);	// y-koordinat (top) för bilen
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > xLimit) x = xLimit;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > yLimit) y = yLimit;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carElem.style.left = x + "px";
	carElem.style.top = y + "px";
	timerRef = setTimeout(moveCar, timerStep);

	/* === Tillägg i labben === */
	checkHit ();
	// Variabel till funktionen checkHit.
} // Slut moveCar
// --------------------------------------------------

/* ===== Tillägg av nya funktioner i labben ===== */

// Funktion för att ett nytt vildsvin ska dyka upp under spelets gång, oavsett vid krock eller ej. Men max 10 stycken.
function newPig() {
	if (pigNr < 10) {
	let xLimit = boardElem.offsetWidth - pigElem.offsetWidth - 20;
	let yLimit = boardElem.offsetHeight - pigElem.offsetHeight - 20;
	let x = Math.floor(xLimit * Math.random()) + 10;
	let y = Math.floor(yLimit * Math.random()) + 10;
	// Detta är det som beräknar avståndet mellan bilen och vildsvinet, alltså inom vilket spann man ska kunna ha bilen för att det ska bli en krock.
	pigElem.style.left = x + "px";
	pigElem.style.top = y + "px";
	pigElem.src = "img/pig.png"; // Bild-referens.
	pigElem.style.visibility = "visible"; // Referens till att vildsvinet ska visas. 
	pigTimerRef = setTimeout(newPig, pigDuration); // Referens till räknaren för när nya vildsvinet ska visas.
	pigNr++;
	pigNrElem.innerHTML = pigNr;
	catchedPig = false; // När man inte träffat vildsvinet. 
	}
	else stopGame(); 
}

// Funktion för när ett vildsvin träffats.
function checkHit() {
	if (catchedPig) return;
	let cSize = carElem.offsetWidth;
	let pSize = pigElem.offsetWidth;
	let cL = parseInt(carElem.style.left);
	let cT = parseInt(carElem.style.top);
	let pL = parseInt(pigElem.style.left);
	let pT = parseInt(pigElem.style.top);
	// Variabler för att kontrollera om det blivit en träff efter förflyttning av vildsvin eller bil.

	// Villkor för att beräkning om bilen träffat ett vildsvin eller inte.
	if (cL + 10 < pL + pSize && cL + cSize - 10 > pL && cT + 10 < pT + pSize && cT + cSize - 10 > pT)  {
		
		if (pigTimerRef !=null) clearTimeout(pigTimerRef);
		pigElem.src = "img/smack.png"; //img-referens för byte av bild ifall det blivit en krock. 
		hitCounter++;
		hitCounterElem.innerHTML = hitCounter;
		catchedPig = true; // När vildsvinet blivit påkört.
		pigTimerRef = setTimeout(newPig, pigDuration);
	}
}