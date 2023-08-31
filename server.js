const express = require("express");
const port = 5000;
const app = express();
const fs = require("fs");
require("dotenv").config()
var request = require("request");
const apiKey = process.env.sports_key;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

var options = {
    method: 'GET',
    url: 'https://v1.american-football.api-sports.io/standings',
    qs: {league: '1', season: '2022'},
    headers: {
        'x-rapidapi-host': 'v1.american-football.api-sports.io',
        'x-rapidapi-key': apiKey
    }
};

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


