require("dotenv").config()
const express = require("express");
var request = require("request");
const fs = require("fs");
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

fs.readFile(path, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading JSON file:", err);
        return;
    }

    const jsonData = JSON.parse(data);
    const idToName = {};

    for (const response of jsonData.response){
        const teamId = response.team.id;
        const teamName = response.team.name;
        idToName[teamId] = teamName;
    }
    for (let i = 1; i <= 32; i++){
        const teamName = idToName[i];
        console.log(i, teamName);
    }
});
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


