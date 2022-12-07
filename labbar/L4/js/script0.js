// Globala konstanter och variabler
// Arrayer med nummer för bilder samt tillhörande namn och beskrivning
const allNrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const allWords = ["Borgholm", "Gränna", "Gävle", "Göteborg", "Halmstad", "Jönköping", "Kalmar", "Karlskrona", "Kiruna", "Ljungby", "Malmö", "Norrköping", "Skara", "Stockholm", "Sundsvall", "Umeå", "Visby", "Västervik", "Växjö", "Örebro"];
const allDescriptions = ["Kyrkan", "Storgatan", "Julbock", "Operan", "Picassoparken", "Sofiakyrkan", "Domkyrkan", "Rosenbom", "Stadshus", "Garvaren", "Stortorget", "Spårvagn", "Domkyrka", "Rosenbad", "Hotell Knaust", "Storgatan", "Stadsmur", "Hamnen", "Teater", "Svampen"];
// Element i gränssnittet
var startGameBtn;		// Referenser till start-knappen (button)
var checkAnswersBtn;	// Referens till knappen för att kontrollera svar (button)
var wordListElem;		// Referens till listan med de åtta orden (ul-elementet)
var wordElems;			// Array med referenser till elementen för de åtta orden (li-elemnten)
var imgElems;			// Array med referenser till elementen med de fyra bilderna (img)
var answerElems;		// Array med referenser till elementen för orden intill bilderna (p)
var correctElems;		// Array med referenser till element för rätta svar (p)
var largeImgElem;		// Referens till elementet med den stora bilden (img)
var msgElem; 			// Referens till div-element för utskrift av meddelanden (div)
// Element vid drag and drop
var dragElem;			// Det element som dras (kan vara både li och p)
// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt händelsehanterare.
function init() {
	// Referenser till element i gränssnittet
	startGameBtn = document.getElementById("startGameBtn");
	checkAnswersBtn = document.getElementById("checkAnswersBtn");
	msgElem = document.getElementById("message");
	
	// Lägg på händelsehanterare
	startGameBtn.addEventListener("click", startGame);
	checkAnswersBtn.addEventListener("click", checkAnswers);
	
	// Aktivera/inaktivera knappar
	
} // Slut init
window.addEventListener("load", init); // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------
// Initiera spelet. Välj ord slumpmässigt. Visa ord och bilder.
function startGame() {
	console.log("startGame");

	// Aktivera/inaktivera knappar
	
} // Slut startGame
// --------------------------------------------------
// Visa förstorad bild
function showLargeImg() {
	console.log("showLargeImg");
	
} // Slut showLargeImg
// --------------------------------------------------
// Ta bort förstorad bild
function hideLargeImg() {
	console.log("hideLargeImg");
	
} // Slut hideLargeImg
// --------------------------------------------------
// Kontrollera användarens svar och visa de korrekta svaren
function checkAnswers() {
	console.log("checkAnswers");
	
	// Aktivera/inaktivera knappar
	
} // Slut checkAnswers
// --------------------------------------------------
// Ett ord börjar dras. Spara data om elementet som dras. Händelsehanterare för drop zones
function dragstartWord() {
	
} // Slut dragstartWord
// --------------------------------------------------
// Hantera händelserna dragover och drop, då ett ord släpps över en bild
// För dragover utförs endast första raden med preventDefault.
function wordOverImg(e) { // e är Event-objektet
	
} // Slut wordOverImg
// --------------------------------------------------
// Hantera händelserna dragover och drop, då ett ord släpps över listan med ord
// För dragover utförs endast första raden med preventDefault.
function wordOverList(e) { // e är Event-objektet
	
} // Slut wordOverList
// --------------------------------------------------
// Flytta tillbaks ordet till listan
function moveBackToList(word) { // word är det ord som ska flyttas tillbaks
	
} // Slut moveBackToList
// --------------------------------------------------