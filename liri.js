require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var searchFunction = process.argv[2];
var searchWord = [];
var txtSearch = false;
var br = "--------------------------------------------------------------------------";

// In case the search word is more than one word in length, this logic loops through the words and pushes them into an empty array.

for (var i = 3; i < process.argv.length; i++) {
    searchWord.push(process.argv[i]);
}

searchWord = searchWord.join(" ");

// Function logic for concertSearch, spotifySearch, and movieSearch to call node-spotify-api and axios based on provided search queries.

function concertSearch(string) {

    if (process.argv.length === 3) {

        // If the search parameters are being called from the random.txt file:

        if (txtSearch === true) {
            var queryUrl = "https://rest.bandsintown.com/artists/" + searchWord + "/events?app_id=" + keys.bandsInTown.id;
            axios.get(queryUrl)
                .then(function (response) {
                    console.log(br);
                    console.log("Upcoming " + searchWord + " concerts: ");
                    console.log(" ");

                    fs.appendFile("log.txt", br + "\n\nUpcoming " + searchWord + " concerts: \n \n", function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    

                    //If there are no upcoming concerts / no API response, console.log a sentence specifying this case.

                    if (response.data.length < 1) {
                        console.log("Sorry, there doesn't seem to be any upcoming concerts for this band or artist.");
                        fs.appendFile("log.txt", "Sorry, there doesn't seem to be any upcoming concerts for this band or artist. \n", function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                            console.log("Venue: " + response.data[i].venue.name);
                            console.log("City: " + response.data[i].venue.city);
                            console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                            console.log(" ");
                            fs.appendFile("log.txt","Venue: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city+"\nDate: "+ moment(response.data[i].datetime).format('MM/DD/YYYY') + "\n \n",function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        };
                    }
                    console.log(br);
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

            // If the user does not include a band name in terminal, console log that they need to add a search parameter.

            console.log(br);
            console.log("Please provide a band or artist search parameter to find an upcoming concert.");
            console.log(br);
        }
    } else {

        // Otherwise, use axios to call the API and search for the band.

        var queryUrl = "https://rest.bandsintown.com/artists/" + searchWord + "/events?app_id=" + keys.bandsInTown.id;

        axios.get(queryUrl)
            .then(function (response) {
                console.log(br);
                console.log("Upcoming " + searchWord + " concerts: ");
                console.log(" ");

                fs.appendFile("log.txt", br +  "\n\nUpcoming " + searchWord + " concerts: \n\n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });

                //If there are no upcoming concerts / no API response, console.log a sentence specifying this case.

                if (response.data.length < 1) {
                    console.log("Sorry, there doesn't seem to be any upcoming concerts for this band or artist.");
                    fs.appendFile("log.txt", "Sorry, there doesn't seem to be any upcoming concerts for this band or artist. \n", function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("Venue: " + response.data[i].venue.name);
                        console.log("City: " + response.data[i].venue.city);
                        console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                        console.log(" ");

                        fs.appendFile("log.txt","Venue: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city+"\nDate: "+ moment(response.data[i].datetime).format('MM/DD/YYYY') + "\n \n",function(err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    };
                }
                console.log(br);
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

    if (process.argv.length === 3) {

        // If the search parameters are being called from the random.txt file

        if (txtSearch === true) {
            spotify.search({ type: "track", query: searchWord }, function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }
                console.log(br);
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log(br);

                fs.appendFile("log.txt", br + "\n\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Title: " + data.tracks.items[0].name + "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n\n", function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        } else {

            // If the user does not include a song title in terminal, search for Amber by 311.

            spotify.search({ type: "track", query: "Amber" }, function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }
                console.log(br);
                console.log("Since you didn't provide a song title, here's a song recommendation for you: ");
                console.log(" ");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log(br);

                fs.appendFile("log.txt", br + "\n\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Title: " + data.tracks.items[0].name + "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n\n", function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        }
    } else {

        // Otherwise, use node-spotify-api to call the API and search for the song.

        spotify.search({ type: "track", query: searchWord }, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            console.log(br);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log(br);

            fs.appendFile("log.txt", br + "\n\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Title: " + data.tracks.items[0].name + "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n\n", function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
}

function movieSearch(string) {
    // If the user does not specify a movie search parameter, show information for Mr. Nobody.

    if (process.argv.length === 3) {

        // If the search parameters are being called from the random.txt file

        if (txtSearch === true) {
            var queryUrl = "http://www.omdbapi.com/?t=" + searchWord + "&y=&plot=short&apikey=" + keys.omdb.id;
            axios.get(queryUrl)
                .then(function (response) {
                    console.log(br);
                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year)
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log(br);

                    fs.appendFile("log.txt", br + "\n\nTitle: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n\n", function(err) {
                        if (err) {
                            console.log(err);
                        }
                    })
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

            // If the user does not include a movie title in terminal, search for Mr Nobody.

            var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=" + keys.omdb.id;
            axios.get(queryUrl)
                .then(function (response) {
                    console.log(br);
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
                    console.log(br);

                    fs.appendFile("log.txt", br + "\n\nTitle: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n\n", function(err) {
                        if (err) {
                            console.log(err);
                        }
                    })
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
    } else {

        // otherwise use axios to search the OMDB API for the movie title provided.

        var queryUrl = "http://www.omdbapi.com/?t=" + searchWord + "&y=&plot=short&apikey=" + keys.omdb.id;
        axios.get(queryUrl)
            .then(function (response) {
                console.log(br);
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log(br);

                fs.appendFile("log.txt", br + "\n\nTitle: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n\n", function(err) {
                    if (err) {
                        console.log(err);
                    }
                })
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
        searchWord = dataArray[1];
        txtSearch = true;

        if (dataArray[0] === "concert-this") {
            if (dataArray.length === 1) {
                console.log(br);
                console.log("Please provide a band or artist search parameter to find an upcoming concert.");
                console.log(br);
            } else {
                concertSearch(searchWord);
            }
        } else if (dataArray[0] === "spotify-this-song") {
            if (dataArray.length === 1) {
                searchWord = "Amber"
                spotifySearch(searchWord);
            } else {
                spotifySearch(searchWord);
            }
        } else if (dataArray[0] === "movie-this") {
            if (dataArray.length === 1) {
                searchWord = "Mr Nobody"
                movieSearch(searchWord);
            } else {
                movieSearch(searchWord);
            }
        } else {
            console.log(br)
            console.log("I don't understand that command. Try saying 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'...");
            console.log(br)
        }
    });

} else {
    console.log(br)
    console.log("I don't understand that command. Try saying 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'...");
    console.log(br)
}

