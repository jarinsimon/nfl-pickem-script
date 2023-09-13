const path = './config.json';

const cardsContainer = document.getElementById("cardsContainer");
const generateCardsButton = document.getElementById("generateCards");
const playerSelect = document.getElementById("numberDropdown");

//Populate dropdown menu for number of players
var select = document.getElementById("numberDropdown");
for (var i = 2; i <= 16; i++){
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    select.appendChild(option);
}

var numPlayers;
//When number of players is changed, then update value of numPlayers variable
playerSelect.addEventListener('change', (event) => {
    numPlayers = event.target.value;
    playerNameInputs(numPlayers);
});

//Enter player names
function playerNameInputs(numPlayers){
    const playerNames = document.getElementById("player-names");
    playerNames.className = 'player-names';
    playerNames.innerHTML = `<div id="player-name-inputs"></div>`;
    const playerNameInputs = playerNames.querySelector("#player-name-inputs");

    for (let i = 1; i <= numPlayers; i++){
        const inputField = document.createElement('input');
        inputField.id = `player-input-${i}`;
        inputField.type = 'text';
        inputField.placeholder = `Player ${i} Name:`;
        inputField.classList.add('name-input-fields');
        playerNameInputs.appendChild(inputField);
    }
    return playerNames;
}

//Create card for each player
function createCard(cardNumber, numInputFields, playerName){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div id="card-top">
            <h2>${playerName}</h2>
        </div>
        <div id="card-teams">
        </div>
    `;
    // <label for="player-${cardNumber}-name">Player Name:</label>
    //<input type="text" id="player-${cardNumber}-name" name="player-${cardNumber}-name" placeholder="Player ${cardNumber} Name"></input>

    const cardTeams = card.querySelector("#card-teams");

    if (numPlayers < 3){
        cardTeams.classList.add("two");
        cardTeams.classList.remove("threeFour");
        cardTeams.classList.remove("fiveOrMore");
    } else if (numPlayers <= 4){
        cardTeams.classList.remove("two");
        cardTeams.classList.add("threeFour");
        cardTeams.classList.remove("fiveOrMore");
    } else {
        cardTeams.classList.remove("two");
        cardTeams.classList.remove("threeFour");
        cardTeams.classList.add("fiveOrMore");
    }

    for (let i = 1; i <= numInputFields; i++){
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = `input-${(cardNumber-1) * perPlayer + i}`;
        inputField.name = `extra-field-${cardNumber}-${i}`;
        inputField.placeholder = `${playerName} Team ${i}`;
        inputField.classList.add('input-fields');
        cardTeams.appendChild(inputField);
    }
    return card;
}

var perPlayer;
var remainder;
//When Generate Cards Button is pressed, update number of players and input fields
generateCardsButton.addEventListener('click', (event) => {
    let playerNames = new Array(numPlayers);
    perPlayer = Math.floor(32/numPlayers);
    remainder = 32 % numPlayers;
    console.log(`There are ${numPlayers} players in your Pickem League`);
    console.log(`Each player has ${perPlayer} teams, and there are ${remainder} teams unpicked`);

    cardsContainer.innerHTML='';
    for (let i = 1; i <= numPlayers; i++){
        var tempId = `player-input-${i}`;
        playerNames[i-1] = document.getElementById(tempId).value;
        const newCard = createCard(i, perPlayer, playerNames[i-1]);
        cardsContainer.appendChild(newCard);
    }
    //Clear playerNameInput
    const playerNameInput = document.getElementById("player-name-inputs");
    playerNameInput.innerHTML = '';
});

const checkboxes = document.getElementById("checkbox-container");
const valueToInputMap = {};
var inputCounter = 0;

//When checkbox is clicked
checkboxes.addEventListener('click', (event) =>{
    if (event.target.type === 'checkbox'){
        const checkbox = event.target;
        var firstAvail = findFirstAvailableField();

        //Add value of checkbox to input field
        if (event.target.checked){
            const targetField = document.getElementById(`input-${firstAvail}`);
            valueToInputMap[checkbox.name] = firstAvail;
            targetField.value = checkbox.name;
            inputCounter++;
        } else {
        //Remove value of checkbox to input field
            const targetField = document.getElementById(`input-${valueToInputMap[checkbox.name]}`);
            targetField.value = '';
            inputCounter--;
        }
    }
});

//Return value of the first
function findFirstAvailableField(){
    for (let i = 1; i <= 32; i++){
        const field = document.getElementById(`input-${i}`);
        if (field.value === ''){
            return i;
        }
    }
    return -1;
}