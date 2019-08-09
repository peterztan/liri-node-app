require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');

var fs = require('fs');

var input = process.argv;

var commands = input[2];
console.log('You have entered the following command: ' + commands + '\n\n');

var requestElement = input.slice(3).join("");

//First, create Spotify related data request, and command functions
//spotify command is spotify-this-song
var searchLogic = function() {
  switch (commands) {
    case "spotify-this-song":
      spotify
        .search({
          type: "track",
          query: requestElement,
          limit: 5
        })
        .then(function(response) {
            var result = response.tracks.items;
          for (let i = 0;i<result.length;i++){
              
          console.log(
            '================================================' +
            '\n\nArtists: ' +
                result[i].artist +
            '\n\nThe Song\'s name: ' +
                result[i].name +
            '\n\nA preview link of the song from Spotify: ' +
                result[i].preview_url +
            '\n\nThe album that the song is from: ' +
                result[i].album.name +
            '\n\n================================================'
            );
          };
        }).catch(function(err){
            console.log(err);
        });
      break;
    case "concert-this":
      axios
        .get(
          "https://rest.bandsintown.com/artists/" +
            requestElement +
            "/events?app_id=codingbootcamp"
        )
        .then(function(response) {
            var result = response.data[0];
            var eventDate = moment(result.datetime).format("MM/DD/YYYY");
          console.log(
            '================================================' +
            "\n\nYou can find events information below:\n\nName(s) of the venue: " +
              result.venue.name +
            "\n\nVenue location(s): " +
                result.venue.city + ', ' + result.venue.region + ', ' + result.venue.country +
            "\n\nDate(s) of the Event(s): " +
                eventDate +
            '\n\n================================================'
          );
        });
      break;
    case "movie-this":
        switch (requestElement) {
            case '':
                var defaultMovie = 'Mr.Nobody';
                    axios
                    .get(
                        "http://www.omdbapi.com/?t=" + defaultMovie + "&y=&plot=short&apikey=trilogy"
                    )
                    .then(function(response) {
                        var result = response.data;
                        console.log('================================================' + 
                        '\n\nTitle of the Movie: ' + result.Title + 
                        '\n\nYear the movie came out: ' + result.Year + 
                        '\n\nIMDB Rating of the movie: ' + result.imdbRating + 
                        '\n\nRotten Tomatoes Rating of the movie: ' + result.Ratings[1].Value + 
                        '\n\nCountry where the movie was produced: ' + result.Country + 
                        '\n\nLanguage of the movie: ' + result.Language + 
                        '\n\nPlot of the movie: ' + result.Plot + 
                        '\n\nActors in the movie: ' + result.Actors + 
                        '\n\n================================================');
                    });
                break;

            default:
                    axios
                        .get(
                            "http://www.omdbapi.com/?t=" + requestElement + "&y=&plot=short&apikey=trilogy"
                        )
                        .then(function(response) {
                            var result = response.data;
                            console.log('================================================' + '\n\nTitle of the Movie: ' + result.Title + '\n\nYear the movie came out: ' + result.Year + '\n\nIMDB Rating of the movie: ' + result.imdbRating + '\n\nRotten Tomatoes Rating of the movie: ' + result.Ratings[1].Value + '\n\nCountry where the movie was produced: ' + result.Country + '\n\nLanguage of the movie: ' + result.Language + '\n\nPlot of the movie: ' + result.Plot + '\n\nActors in the movie: ' + result.Actors + '\n\n================================================');
                        });
        };
    break;
    case "do-what-it-says":
        fs.readFile('./random.txt');
}};

searchLogic();

//Second, create BandsInTown related data request, and command functions
//BandsInTown command is concert-this

//Thirs, create omdb related data request, and command functions
//omdb command is movie-this

//additional command is do-what-it-says, run above commands according to randm.txt content.
