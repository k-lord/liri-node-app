//require("dotenv").config();

/* Keeps coming back undefined so I'll circle back to this later.
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var omdb = new omdb(keys.ombd);
var bandsInTown = new bandsInTown(keys.bandsInTown);
*/

//-------------------------------------------------------------------------

//In case the searched band, song, or movie is more than one word in length, this logic loops through the words and pushes them into an empty array.
var searchWord = [];

for (var i = 3; i < process.argv.length; i++) {
    searchWord.push(process.argv[i]);
}

searchWord = searchWord.join(" ");

//-------------------------------------------------------------------------

var axios = require("axios");

//-------------------------------------------------------------------------

if (process.argv[2] === "concert-this") {
    console.log("working on getting this command to work...");

} else if (process.argv[2] === "spotify-this-song") {
    console.log("working on getting this command to work...");

} else if (process.argv[2] === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + searchWord + "&y=&plot=short&apikey=bf295504";
    console.log(queryUrl);
    axios.get(queryUrl)
        .then(function (response) {
            console.log(response.data);
            console.log("This movie came out in " + response.data.Year);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made but the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error: ", error.message);
            }
            console.log(error.config);
        });

} else if (process.argv[2] === "do-what-it-says") {
    console.log("working on getting this command to work...");

} else {
    console.log("I don't understand that command. Try saying 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'...");
}

