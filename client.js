// const fs = require("fs");
// const readLine = require("readline")
// const { resolve } = require("path");

// const jsdom = require ("jsdom");
// const { JSDOM } = jsdom;
// const htmlContent = fs.readFileSync('index.html', 'utf-8');
// const dom = new JSDOM(htmlContent);
//const document = dom.window.document;

const path = './config.json';

var chosenTeam;

// function getNumPlayers() {
//     return new Promise(resolve => {
//         const rl = readLine.createInterface({
//             input: process.stdin,
//             output: process.stdout
//         });
//         rl.question('How many players are in your pickem league?\n', (answer) => {
//             resolve(answer)
//             perTeam = Math.floor(32/answer);
//             const remainder = 32 % perTeam;

//             console.log(`You have ${answer} players in your Pickem League\nEach player should have ${perTeam} teams, with ${remainder} teams unpicked`);
//             rl.close();
//         })
//     })
// }

// async function getPlayers(){
//     //numPlayers = await getNumPlayers();
//     fs.readFile(path, "utf8", (err, data) => {
//         if (err) {
//             console.error("Error reading JSON file:", err);
//             return;
//         }
    
//         const jsonData = JSON.parse(data);
//         const idToName = {};
//         const NameToId = {}
    
//         for (const response of jsonData.response){
//             const teamId = response.team.id;
//             const teamName = response.team.name;
//             idToName[teamId] = teamName;
//             NameToId[teamName] = teamId;
//         }
//         var k = 1;
//         for (let i = 1; i <= numPlayers; i++){
//             for (let j = 1; j <= perTeam; j++){
//                 console.log(`Player ${i} Team ${j}:`)
//                 console.log(idToName[k] + '\n');
//                 k++;
//             }
//         }
//     });
// }

//getPlayers();
var numPlayers;
var perPlayer;
var remainder;

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

//When number of players is changed, then update value of numPlayers variable
playerSelect.addEventListener('change', (event) => {
    numPlayers = event.target.value;
})

//Create card for each player
function createCard(cardNumber, numInputFields){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>Player #${cardNumber}</h2>
        <label for="player-${cardNumber}-name">Player Name:</label>
        <input type="text" id="player-${cardNumber}-name" name="player-${cardNumber}-name" placeholder="Player ${cardNumber} Name">
    `;

    for (let i = 1; i <= numInputFields; i++){
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = `extra-field-${cardNumber}-${i}`;
        inputField.placeholder = `Player ${cardNumber} Team ${i}`;
        card.appendChild(inputField);
    }
    return card;
}

//When Generate Cards Button is pressed, update number of players and input fields
generateCardsButton.addEventListener('click', (event) => {
    perPlayer = Math.floor(32/numPlayers);
    remainder = 32 % numPlayers;
    console.log(`There are ${numPlayers} players in your Pickem League`);
    console.log(`Each player has ${perPlayer} teams, and there are ${remainder} teams unpicked`);

    cardsContainer.innerHTML='';
    for (let i = 1; i <= numPlayers; i++){
        const newCard = createCard(i, perPlayer);
        cardsContainer.appendChild(newCard);
    }
});


