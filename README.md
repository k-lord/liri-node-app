# liri-node-app
Inspired by SIRI, Language Interpretation and Recognition Interface (LIRI) is a command line node app that takes in parameters and gives you back data.

### Overview
LIRI is a command line node app that takes in search parameters, and using the `axios` and `spotify` npm packages, gives you back data retrieved from the following APIs:
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [OMDB](http://omdbapi.com/)



You can use LIRI to search for song information for a specific track, upcoming concerts for a specific band or artist, or movie information for a specific movie.

### How to Use
1. To use LIRI, you first must provide a search command.
    * The available search commands and responses are as follows:
        * `concert-this`: this command searches the `Bands In Town API`.
            * For this command, you _must_ provide a search query immediately following the command. If you do not provide a band or artist's name for which to search, you will receive a message informing you that a band or artist name is required.
            * Once a search query has been included in the command line, you will receive a response from the `Bands In Town API` that includes the following information:
                * Name of the Venue
                * Venue Location
                * Date of the Event (formatted as "MM/DD/YYYY" using moment.js)
            * If the band is not currently on tour, you will receive a message stating this.
    

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
