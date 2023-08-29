require("dotenv").config()
const express = require("express");
var request = require("request");
const prompt = require('prompt-sync')();
const fs = require("fs");
const readLine = require("readline")
const { resolve } = require("path");
const app = express();
const apiKey = process.env.sports_key
const path = './config.json';

var options = {
    method: 'GET',
    url: 'https://v1.american-football.api-sports.io/standings',
    qs: {league: '1', season: '2022'},
    headers: {
        'x-rapidapi-host': 'v1.american-football.api-sports.io',
        'x-rapidapi-key': apiKey
    }
};

var chosenTeam;
var numPlayers;
var perTeam;

function getNumPlayers() {
    return new Promise(resolve => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('How many players are in your pickem league?\n', (answer) => {
            resolve(answer)
            perTeam = Math.floor(32/answer);
            const remainder = 32 % perTeam;

            console.log(`You have ${answer} players in your Pickem League\nEach player should have ${perTeam} teams, with ${remainder} teams unpicked`);
            rl.close();
        })
    })
}

async function getPlayers(){
    numPlayers = await getNumPlayers();
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return;
        }
    
        const jsonData = JSON.parse(data);
        const idToName = {};
        const NameToId = {}
    
        for (const response of jsonData.response){
            const teamId = response.team.id;
            const teamName = response.team.name;
            idToName[teamId] = teamName;
            NameToId[teamName] = teamId;
        }
        var k = 1;
        for (let i = 1; i <= numPlayers; i++){
            for (let j = 1; j <= perTeam; j++){
                console.log(`Player ${i} Team ${j}:`)
                console.log(idToName[k] + '\n');
                k++;
            }
        }
    });
}

getPlayers();

// request(options, (error, response, body) => {
//     if (!error && response.statusCode === 200){
//         try {
//             const jsonData = JSON.parse(body);
//             fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
//                 if (err) {
//                     console.error("Error writing to JSON: ", err);
//                 } else {
//                     console.log("Data written to config.json");
//                 }
//             });
//         } catch (parseError) {
//             console.error("Error parsing JSON: ", parseError);
//         }
//     } else {
//         console.error("Error making HTTP request:", error);
//     }
// });


