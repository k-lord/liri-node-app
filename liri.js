//require("dotenv").config();

/* Keeps coming back undefined so I'll circle back to this later.
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var omdb = new omdb(keys.ombd);
var bandsInTown = new bandsInTown(keys.bandsInTown);
*/

//------------------------------------------------------------------------------------------------

//In case the searched band, song, or movie is more than one word in length, this logic loops through the words and pushes them into an empty array.

var searchWord = [];

for (var i = 3; i < process.argv.length; i++) {
    searchWord.push(process.argv[i]);
}

searchWord = searchWord.join(" ");

// npm packages ----------------------------------------------------------------------------------

var axios = require("axios");
var moment = require("moment");

//Bands In Town API ------------------------------------------------------------------------------

if (process.argv[2] === "concert-this") {

    // If the user does not include a band name, console log that they need to add a search parameter.

    if (process.argv.length === 3) {
        console.log("Please provide a search parameter.");
    } 
    
    // Otherwise, use axios to call the API and search for the band.
    
    else {
        var queryUrl = "https://rest.bandsintown.com/artists/" + searchWord + "/events?app_id=0eafe38939fa05eaeecc7292882b17fc";
        console.log(queryUrl);
        axios.get(queryUrl)
            .then(function (response) {
                console.log("------------------------------------------------------------------------")
                console.log("Upcoming " + searchWord + " concerts: ");
                console.log(" ");

                //If there are no upcoming concerts / no API response, console.log a sentence specifying this case.

                if (response.data.length < 1) {
                    console.log("Sorry, there doesn't seem to be any upcoming concerts for this band or artist.")
                } else {
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("Venue: " + response.data[i].venue.name);
                        console.log("City: " + response.data[i].venue.city);
                        console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                        console.log(" ");
                    };
                }
                console.log("------------------------------------------------------------------------")
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

    }


}

// Spotify API ----------------------------------------------------------------------------------

else if (process.argv[2] === "spotify-this-song") {
    console.log("working on getting this command to work...");

    

} 

//OMDB API --------------------------------------------------------------------------------------

else if (process.argv[2] === "movie-this") {

    // If the user does not specify a movie search parameter, show information for Mr. Nobody.

    if (process.argv.length === 3) {
        searchword = "Mr Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + searchWord + "&y=&plot=short&apikey=bf295504";
        //console.log(queryUrl);
        axios.get(queryUrl)
            .then(function (response) {
                console.log("-------------------------------------------------------------------")
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("-------------------------------------------------------------------")

                    ;
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

    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + searchWord + "&y=&plot=short&apikey=bf295504";
        //console.log(queryUrl);
        axios.get(queryUrl)
            .then(function (response) {
                console.log("-------------------------------------------------------------------")
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("-------------------------------------------------------------------")
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

    }

    //-------------------------------------------------------------------------

} else if (process.argv[2] === "do-what-it-says") {
    console.log("working on getting this command to work...");

    //-------------------------------------------------------------------------

} else {
    console.log("I don't understand that command. Try saying 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'...");
}

