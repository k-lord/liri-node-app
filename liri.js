require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var searchFunction = process.argv[2];
var searchWord = [];
var txtSearch = false;

//In case the search word is more than one word in length, this logic loops through the words and pushes them into an empty array.

for (var i = 3; i < process.argv.length; i++) {
    searchWord.push(process.argv[i]);
}

searchWord = searchWord.join(" ");

// -----------------------------------------------------------------------------------------------

function concertSearch(string) {

    if (string = process.argv.length === 3) {

        // If the search parameters are beign called from the random.txt file

        if (txtSearch === true) {
            var queryUrl = "https://rest.bandsintown.com/artists/" + searchWord + "/events?app_id=" + keys.bandsInTown.id;
            //console.log(queryUrl);
            axios.get(queryUrl)
                .then(function (response) {
                    console.log("------------------------------------------------------------------------");
                    console.log("Upcoming " + searchWord + " concerts: ");
                    console.log(" ");

                    //If there are no upcoming concerts / no API response, console.log a sentence specifying this case.

                    if (response.data.length < 1) {
                        console.log("Sorry, there doesn't seem to be any upcoming concerts for this band or artist.");
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                            console.log("Venue: " + response.data[i].venue.name);
                            console.log("City: " + response.data[i].venue.city);
                            console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                            console.log(" ");
                        };
                    }
                    console.log("------------------------------------------------------------------------");
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

        // If the user does not include a band name, console log that they need to add a search parameter.

        else {
            console.log("------------------------------------------------------------------------");
            console.log("Please provide a band or artist search parameter to find an upcoming concert.");
            console.log("------------------------------------------------------------------------");
        }
    }

    // Otherwise, use axios to call the API and search for the band.

    else {
        var queryUrl = "https://rest.bandsintown.com/artists/" + searchWord + "/events?app_id=" + keys.bandsInTown.id;
        //console.log(queryUrl);
        axios.get(queryUrl)
            .then(function (response) {
                console.log("------------------------------------------------------------------------");
                console.log("Upcoming " + searchWord + " concerts: ");
                console.log(" ");

                //If there are no upcoming concerts / no API response, console.log a sentence specifying this case.

                if (response.data.length < 1) {
                    console.log("Sorry, there doesn't seem to be any upcoming concerts for this band or artist.");
                } else {
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("Venue: " + response.data[i].venue.name);
                        console.log("City: " + response.data[i].venue.city);
                        console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                        console.log(" ");
                    };
                }
                console.log("------------------------------------------------------------------------");
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

function spotifySearch(string) {
    var spotify = new Spotify(keys.spotify);

    // If the user does not include a song title, search for Amber by 311.

    if (process.argv.length === 3) {

        // If the search parameters are beign called from the random.txt file

        if (txtSearch === true) {
            spotify.search({ type: "track", query: searchWord }, function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }
                //console.log(data.tracks.items[0]);
                console.log("------------------------------------------------------------------------");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("------------------------------------------------------------------------");
            });
        }

        // If the user does not include a song title, search for Amber by 311.

        else {
            spotify.search({ type: "track", query: "Amber" }, function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }
                console.log("------------------------------------------------------------------------");
                console.log("Since you didn't provide a song title, here's a song recommendation for you: ");
                console.log(" ");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("------------------------------------------------------------------------");
            });
        }
    }

    // Otherwise, use node-spotify-api to call the API and search for the song.

    else {
        spotify.search({ type: "track", query: searchWord }, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            //console.log(data.tracks.items[0]);
            console.log("------------------------------------------------------------------------");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("------------------------------------------------------------------------");
        });
    }
}

function movieSearch(string) {
    // If the user does not specify a movie search parameter, show information for Mr. Nobody.

    if (process.argv.length === 3) {

        // If the search parameters are beign called from the random.txt file

        if (txtSearch === true) {
            var queryUrl = "http://www.omdbapi.com/?t=" + searchWord + "&y=&plot=short&apikey=" + keys.omdb.id;
            //console.log(queryUrl);
            axios.get(queryUrl)
                .then(function (response) {
                    console.log("-------------------------------------------------------------------");
                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year)
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("-------------------------------------------------------------------");
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

        // If the user does not include a movie title, search for Mr Nobody.

        else {
            var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=" + keys.omdb.id;
            //console.log(queryUrl);
            axios.get(queryUrl)
                .then(function (response) {
                    console.log("------------------------------------------------------------------------");
                    console.log("Since you didn't provide a movie title, here's a movie recommendation for you: ");
                    console.log(" ");
                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("------------------------------------------------------------------------");
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

    // otherwise use axios to search the OMDB API for the movie title provided.

    else {
        var queryUrl = "http://www.omdbapi.com/?t=" + searchWord + "&y=&plot=short&apikey=" + keys.omdb.id;
        //console.log(queryUrl);
        axios.get(queryUrl)
            .then(function (response) {
                console.log("-------------------------------------------------------------------");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("-------------------------------------------------------------------");
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

if (searchFunction === "concert-this") {

    concertSearch(searchWord);

} else if (searchFunction === "spotify-this-song") {

    spotifySearch(searchWord);

} else if (searchFunction === "movie-this") {

    movieSearch(searchWord);

} else if (searchFunction === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArray = data.split(",");

        //console.log(dataArray[0]);
        //console.log(dataArray[1]);

        searchWord = dataArray[1];
        txtSearch = true;
        //console.log("search word is: " + searchWord);

        if (dataArray[0] === "concert-this") {
            concertSearch(searchWord);
        } else if (dataArray[0] === "spotify-this-song") {
            spotifySearch(searchWord);
        } else if (dataArray[0] === "movie-this") {
            movieSearch(searchWord);
        } else {
            console.log("-------------------------------------------------------------------")
            console.log("I don't understand that command. Try saying 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'...");
            console.log("-------------------------------------------------------------------")
        }
    });

} else {
    console.log("-------------------------------------------------------------------")
    console.log("I don't understand that command. Try saying 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'...");
    console.log("-------------------------------------------------------------------")
}

