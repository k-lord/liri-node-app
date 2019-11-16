# liri-node-app
Inspired by SIRI, Language Interpretation and Recognition Interface (LIRI) is a command line node app that takes in parameters and gives you back data.

### Overview
LIRI is a command line node app that takes in `search-command` and `search-query` parameters. Using the `axios` and `spotify` npm packages, LIRI then gives you back data retrieved from the following APIs:
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [OMDB](http://omdbapi.com/)

You can use LIRI to search for song information for a specific track, upcoming concerts for a specific band or artist, or movie information for a specific movie.

### How to Use
To use LIRI, you must provide a `search-command` and then a `search-query` in the command line.

#### Examples
* Bands In Town Example: `node liri.js concert-this Tyler The Creator`
* Spotify Example: `node liri.js spotify-this-song Respect`
* OMDB Example: `node liri.js movie-this The Fast and The Furious Tokyo Drift`
* Random.txt Example: `node liri.js do-what-it-says`

#### Reference Guide
* The available `search-commands` and responses are as follows:
    1. `concert-this`: this command searches the `Bands In Town API`.
        * If a `search-query` has been included in the command line following `concert-this`, you will receive a response from the `Bands In Town API` that includes the following information:
            * Name of the Venue
            * Venue Location
            * Date of the Event (formatted as "MM/DD/YYYY" using `moment.js`)

        * For this command, you _must_ provide a `search-query` following `concert-this`. If you do not provide a band or artist's name for which to search, you will receive a message informing you that a band or artist name is required.
        * If the band is not currently on tour, you will receive a message stating this.

    2. `spotify-this-song`: this command searches the `Node-Spotify-API`.
        * If a `search-query` has been included in the command line following `spotify-this-song`, you will receive a response from the `Node-Spotify-API` that includes the following information:
            * Artist(s)
            * The song's name
            * A preview link of the song from Spotify
            * The album that the song is from
        * If a `search-query` has _not_ been included after `spotify-this-song`, it is set to a default response showing results for "Amber" by 311.

    3. `movie-this`: this command searches the `OMDB API`.
        * If a `search-query` has been included in the command line following `movie-this`, you will receive a response from the `OMDB API` that includes the following information:
            * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie.
        * If a `search-query` has _not_ been included after `movie-this`, it is set to a default response showing results for _Mr. Nobody_.
            
        
    

![](liri-giphy-1.gif)
![](liri-giphy-2.gif)
![](liri-giphy-3.gif)
![](liri-giphy-4.gif)
![](liri-giphy-5.gif)
![](liri-giphy-6.gif)
![](liri-giphy-7.gif)
![](liri-giphy-8.gif)
![](liri-giphy-9.gif)
![](liri-giphy-10.gif)
![](liri-giphy-11.gif)

2. Give a high-level overview of how the app is organized
3. Give start-to-finish instructions on how to run the app
4. Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app
6. Clearly list the technologies used in the app
7. State your role in the app development
