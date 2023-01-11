// Globala konstanter och variabler
// Arrayer med nummer för bilder samt tillhörande namn och beskrivning
const allNrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const allWords = ["Borgholm", "Gränna", "Gävle", "Göteborg", "Halmstad", "Jönköping", "Kalmar", "Karlskrona", "Kiruna", "Ljungby", "Malmö", "Norrköping", "Skara", "Stockholm", "Sundsvall", "Umeå", "Visby", "Västervik", "Växjö", "Örebro"];
const allDescriptions = ["Kyrkan", "Storgatan", "Julbock", "Operan", "Picassoparken", "Sofiakyrkan", "Domkyrkan", "Rosenbom", "Stadshus", "Garvaren", "Stortorget", "Spårvagn", "Domkyrka", "Rosenbad", "Hotell Knaust", "Storgatan", "Stadsmur", "Hamnen", "Teater", "Svampen"];
// Element i gränssnittet
var startGameBtn;		// Referenser till start-knappen (button)
var checkAnswersBtn;	// Referens till knappen för att kontrollera svar (button)
var msgElem; 			// Referens till div-element för utskrift av meddelanden (div)
var wordListElem;		// Referens till listan med de åtta orden (ul-elementet)
var wordElems;			// Array med referenser till elementen för de åtta orden (li-elemnten)
var imgElems;			// Array med referenser till elementen med de fyra bilderna (img)
var answerElems;		// Array med referenser till elementen för orden intill bilderna (p)
var correctElems;		// Array med referenser till element för rätta svar (p)
var largeImgElem;		// Referens till elementet med den stora bilden (img)
// Element vid drag and drop
var dragElem;			// Det element som dras (kan vara både li och p)
// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt händelsehanterare.
function init() {
	// Referenser till element i gränssnittet
	wordListElem = document.getElementById("wordList").getElementsByTagName("ul")[0];
	wordElems = document.getElementById("wordList").getElementsByTagName("li");
	imgElems = document.getElementById("imgList").getElementsByTagName("img");
	answerElems = document.getElementsByClassName("userAnswer");
	correctElems = document.getElementsByClassName("correctAnswer");
	largeImgElem = document.getElementById("largeImg");
	startGameBtn = document.getElementById("startGameBtn");
	checkAnswersBtn = document.getElementById("checkAnswersBtn");
	msgElem = document.getElementById("message");


	// Lägg på händelsehanterare
	startGameBtn.addEventListener("click", startGame);
	checkAnswersBtn.addEventListener("click", checkAnswers);
	// Referenser till att klick-funktionerna ska fungera. 

	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].addEventListener("mouseenter", showLargeImg);
		imgElems[i].addEventListener("mouseleave", hideLargeImg);
	} // Kod för att referera till att bilden ska bli större när musen är över bilden och minskas igen till orginal storlek när man tar bort musen. 

	for (let i = 0; i < wordElems.length; i++) {
		wordElems[i].addEventListener("dragstart", dragstartWord);
		wordElems[i].addEventListener("dragend", dragendWord);
	} // Kod för att kunna dra orden till bilderna. 
	for (let i = 0; i < answerElems.length; i++) {
		answerElems[i].addEventListener("dragstart", dragstartWord);
		answerElems[i].addEventListener("dragend", dragendWord);
	} // Kod för att orden ska stanna vid den bild man har dragit ordet till.
	// Aktivera/inaktivera knappar
	startGameBtn.disabled = false;
	for (let i = 0; i < checkAnswersBtn.length; i++) {
		checkAnswersBtn.disabled = true;

	} // Kod för att startknappen ska vara tryckbar för att spelet ska startas medans kontrollknappen ska vara oklickbar till man kört klart.

} // Slut init
window.addEventListener("load", init); // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------
// Initiera spelet. Välj ord slumpmässigt. Visa ord och bilder.
function startGame() {

	let tempNrs = allNrs.slice(0);
	let words = [];
	for (let i = 0; i < 4; i++) {
		let r = Math.floor(tempNrs.length * Math.random());
		let ix = tempNrs[r];
		words.push(allWords[ix]);
		imgElems[i].src = "img/" + ix + ".jpg";
		tempNrs.splice(r, 1);
		imgElems[i].id = ix;
	} // Kod för slumpmässiga namn och bilder. 

	for (let i = 0; i < 4; i++) {
		let r = Math.floor(tempNrs.length * Math.random());
		let ix = tempNrs[r];
		words.push(allWords[ix]);
		tempNrs.splice(r, 1);
	} // Kod för det slumpmässiga namnen & bilder bara ska dyka upp en gång under spelets gång. 
	words.sort();
	for (let i = 0; i < wordElems.length; i++) {
		wordElems[i].innerHTML = words[i];

		wordElems[i].draggable = true;
	} // Kod för att kunna dra orden. 

	for (let i = 0; i < answerElems.length; i++) {
		answerElems[i].draggable = true;
		answerElems[i].innerHTML = "";
		correctElems[i].innerHTML = "";
	} // Kod för de rätta orden.
	msgElem.innerHTML = "";

	startGameBtn.disabled = true;
	checkAnswersBtn.disabled = false;
	// Kod för att startknappen ska vara tillgänglig medans kontroll-knappen ska vara otryckbar tills spelet är startat.
} // Slut startGame
// --------------------------------------------------
// Visa förstorad bild
function showLargeImg() {
	let img = this.src;
	largeImgElem.src = img;
	// Funktion för att bilderna ska bli större vid hover.
} // Slut showLargeImg
// --------------------------------------------------
// Ta bort förstorad bild
function hideLargeImg() {
	largeImgElem.src = "img/empty.png";
	// Funktion för att bilderna ska återgå till normala ursprunget efter muspekaren dragits bort från bilden.
} // Slut hideLargeImg
// --------------------------------------------------

// Kontrollera användarens svar och visa de korrekta svaren
function checkAnswers() {
	for (let i = 0; i < answerElems.length; i++) {
		if (answerElems[i].innerHTML == "") {
			alert("Dra först ord till alla biler."); return;
		} // Meddelande för att man måste fullfölja spelet innan man kan kontrollera svar.
	}
	for (let i = 0; i < wordElems.length; i++) {
		wordElems[i].draggable = false;
	}
	for (let i = 0; i < answerElems.length; i++) {
		answerElems[i].draggable = false;
	}

	let points = 0;
	for (let i = 0; i < answerElems.length; i++) {
		let ix = imgElems[i].id;
		if (answerElems[i].innerHTML == allWords[ix]) {
			points++;
			correctElems[i].innerHTML = allWords[ix] + " " + allDescriptions[ix];
		}
		else {
			correctElems[i].innerHTML = allWords[ix] + " " + allDescriptions[ix];
		}
	}

	msgElem.innerHTML = "Du hade " + points + " rätt.";

	startGameBtn.disabled = false;
	checkAnswersBtn.disabled = true;
} // Slut checkAnswers

// --------------------------------------------------

// Spara referens till elementet som dras. Lägg på händelsehanterare för drop zones.
function dragstartWord() {
	dragElem = this; // Referens till "drag"-elementet. 
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].addEventListener("dragover", wordOverImg);
		imgElems[i].addEventListener("drop", wordOverImg);
	}
	wordListElem.addEventListener("dragover", wordOverList);
	wordListElem.addEventListener("drop", wordOverList);
} // Slut dragstartWord
// --------------------------------------------------
// Ta bort händelsehanterare för drop zones.
function dragendWord() {
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].removeEventListener("dragover", wordOverImg);
		imgElems[i].removeEventListener("drop", wordOverImg);
	}
	wordListElem.removeEventListener("dragover", wordOverList);
	wordListElem.removeEventListener("drop", wordOverList);
} // Slut dragendWord
// --------------------------------------------------

// Hantera händelserna dragover och drop, då ett ord släpps över en bild
// För dragover utförs endast första raden med preventDefault.
function wordOverImg(e) { // e är Event-objektet
	e.preventDefault();
	if (e.type == "drop") {
		let dropElem = this.nextElementSibling; // Referent till elementet img-taggen.
		
		if (dropElem.innerHTML != "") {
			moveBackToList(dropElem.innerHTML);
		} // Referens för att orden ska "åka" tillbaka till listan om det byter ord i elementet.
		dropElem.innerHTML = dragElem.innerHTML;
		dragElem.innerHTML = "";
	}
} // Slut wordOverImg
// --------------------------------------------------
// Hantera händelserna dragover och drop, då ett ord släpps över listan med ord
// För dragover utförs endast första raden med preventDefault.
function wordOverList(e) { // e är Event-objektet
	e.preventDefault();
	if (e.type == "drop") {
		moveBackToList(dragElem.innerHTML);
		dragElem.innerHTML = "";
	}

} // Slut wordOverList
// --------------------------------------------------
// Flytta tillbaks ordet till listan
function moveBackToList(word) { // word är det ord som ska flyttas tillbaks
	for (let i = 0; i < wordElems.length; i++) {
		if (wordElems[i].innerHTML == "") {
			wordElems[i].innerHTML = word;
			break;
		}

	}
} // Slut moveBackToList
// --------------------------------------------------