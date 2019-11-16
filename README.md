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
* concert-this Example: `node liri.js concert-this Tyler The Creator`
* spotify-this-song Example: `node liri.js spotify-this-song Respect`
* movie-this Example: `node liri.js movie-this The Fast and The Furious Tokyo Drift`
* do-what-it-says Example: `node liri.js do-what-it-says`

#### Reference Guide
The available `search-commands` and responses are as follows:
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
4. `do-what-it-says`: this command takes a `search-command` and `search-query` from a `random.txt` file and then provides the results in the terminal.
    * random.txt Example: `spotify-this-song,I Want It That Way`
        * Be mindful not to add any extra spaces or characters other than the single ',' between the `search-command` and the `search-query`.

* All of the API query results are logged in a file named `log.txt` for reference.
            
        
### GIF Demonstration
Below are screenshare `.gif` files showing the working app.

#### What happens if you don't include a search-command:
![](liri-giphy-1.gif)

#### What happens if you don't include a search-query with concert-this:
![](liri-giphy-2.gif)

#### concert-this: it works!
![](liri-giphy-3.gif)

#### concert-this: what if the band isn't on tour?
![](liri-giphy-4.gif)

#### spotify-this-song: it works!
![](liri-giphy-5.gif)

#### What happens if you don't include a search-query with spotify-this-song?
![](liri-giphy-6.gif)

#### movie-this: it works!
![](liri-giphy-7.gif)

#### movie-this: what happens if you don't include a search-query with movie-this?
![](liri-giphy-8.gif)

####  do-what-it-says: it works!
![](liri-giphy-9.gif)

#### do-what-it-says: it works, even when you change the search-command and search-queries!
![](liri-giphy-10.gif)

#### All of your responses are saved in log.txt!
![](liri-giphy-11.gif)

5. Contain a link to a deployed version of the app
6. Clearly list the technologies used in the app
7. State your role in the app development
