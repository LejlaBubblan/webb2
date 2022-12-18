// Globala konstanter och variabler
const roomPrice = [600, 800, 950];		// Pris för rumstyperna
const facilityPrice = [40, 80, 100];	// Pris för tilläggen
var formElem;		// Referens till elementet med hela formuläret
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare. Lägg till info om pris.
function init() {
	formElem = document.getElementById("booking");

	for (let i = 0; i < formElem.roomType.length; i++) {
		formElem.roomType[i].addEventListener("click", checkIfFamilyRoom);
		formElem.roomType[i].nextSibling.textContent += "(" + roomPrice[i] + " kr)";
		formElem.roomType[i].addEventListener("click", calculateCost);
		formElem.facility[i].addEventListener("click", calculateCost);
	} // Elementen till att programmet ska räkna om vid olika val av rum när man klickar i. För beräkna kostnaden för rumstypen, det ska bli annan kostnad vid byte av rumstyp.
	for (let i = 0; i < formElem.facility.length; i++) {
		formElem.facility[i].nextSibling.textContent += " (" + facilityPrice[i] + "kr)";
		formElem.roomType[i].addEventListener("click", calculateCost);
		formElem.facility[i].addEventListener("click", calculateCost);
	} // Elementen för ändra kostnad till de olika valda alternativen. 
	formElem.nrOfNights.addEventListener("change", calculateCost); // Elementet för att beräkna kostnad beroende på antal nätter.
	checkIfFamilyRoom();
	calculateCost();

	// Händelsehanterare för textfält som ska kontrolleras
	formElem.city.addEventListener("blur", checkCity);
	formElem.zipcode.addEventListener("blur", checkField);
	formElem.telephone.addEventListener("blur", checkField);
	// Händelsehanterare för kampanjkod
	formElem.campaigncode.addEventListener("focus", checkCampaign);
	formElem.campaigncode.addEventListener("keyup", checkCampaign);
	formElem.campaigncode.addEventListener("blur", endCheckCampaign);
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------

function checkIfFamilyRoom() {
	if (formElem.roomType[2].checked) {
		formElem.persons.disabled = false;
		formElem.persons.parentNode.style.color = "#000";
		formElem.facility[2].disabled = true;
		formElem.facility[2].parentNode.style.color = "#999";
		formElem.facility[2].checked = false;
	}
	else {
		formElem.persons.disabled = true;
		formElem.persons.parentNode.style.color = "#999";
		formElem.facility[2].disabled = false;
		formElem.facility[2].parentNode.style.color = "#000";

	}
} // Funktion för att programmet ska ändra ifall man fyller i familjerum, det ska vara minst 3 personer. Sedan att det ska byta färg.

function calculateCost() {
	let price = 0;

	for (let i = 0; i < formElem.roomType.length; i++) {
		if (formElem.roomType[i].checked) {
			price = roomPrice[i];
			break;
		}
	}
	for (let i = 0; i < formElem.facility.length; i++) {
		if (formElem.facility[i].checked) {
			price += facilityPrice[i];

		}
	}
	let nrOfNights = formElem.nrOfNights.value;
	totalCost.innerHTML = nrOfNights * price;
} // Funktion för räkna ut priset beroende på antal nätter och valda alternativ.

function checkCity() {
	city = this.value;
	city = city.toUpperCase();
	this.value = city.toUpperCase();
} // Funktion för att bokstäverna ska bli varsaler när man fyllt i vilken ort.

function checkField() {
	const fieldNames = ["zipcode", "telephone"];
	const re = [ //Array med reguljära uttryck för fälten
		/^\d{3} ?\d{2}$/, //postnummer
		/^0\d{1,3}[-/ ]?\d{5,8}$/ //telefonnumer
	];
	const errMsg = [ // Array med felmeddelanden
		"Postnumret måste bestå av fem siffror.",
		"Telnr måste börja med en 0:a och följas av 6-11 siffror."
	];
	let ix = fieldNames.indexOf(this.name); // Index till re och errMsg
	let errMsgElem = this.nextElementSibling; // Element för felmeddelande
	errMsgElem.innerHTML = "";
	if (!re[ix].test(this.value)) {
		errMsgElem.innerHTML = errMsg[ix];
		return false; //Fel i fältet
	}
	else return true; // Fältet är ok
} // slut checkField

function checkCampaign() {
	re = /^[A-ZÅÄÖ]{3}-\d{2}-[A-ZÅÄÖ]{1}\d{1}$/i;
	if (re.test(this.value)) this.style.backgroundColor = "#6F9";
	else this.style.backgroundColor = "#F99";
} // Funktion för hur kampanjkoden ska skrivas, alltså hur många bokstäver samt siffror. Sedan att rutan ska ändra färg beroende på om man skrivit rätt eller inte.

function endCheckCampaign() {
	this.style.backgroundColor = "";
	Campaign = this.value;
	Campaign = Campaign.toUpperCase();
	this.value = Campaign.toUpperCase();
} // Funktion för att bokstäverna ska bli varsaler när man skrivit in kampanjkoden. 