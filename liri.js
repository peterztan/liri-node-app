require("dotenv").config();

var Spotify = require("node-spotify-api");

//var spotify = new Spotify(keys.spotify);
console.log(keys);

var keys = require("./keys.js");

var axios = require("axios");

var input = process.argv;

var commands = input[2];
console.log(commands);

var requestElement = input.slice(3).join("");

//First, create Spotify related data request, and command functions
//spotify command is spotify-this-song
var searchLogic = function() {
  switch (commands) {
    case "spotify-this-song":
      spotify.search(
        {
          type: "track",
          query: requestElement
        }).then(
        function(err, data) {
          if (err) {
            return console.log("An Error has occured!" + err);
          }

          console.log(data);
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
          console.log(response.data[0].venue);
        });
      break;
    default:
      console.log("An Error has occured!");
  }
};

searchLogic();

//Second, create BandsInTown related data request, and command functions
//BandsInTown command is concert-this

//Thirs, create omdb related data request, and command functions
//omdb command is movie-this

//additional command is do-what-it-says, run above commands according to randm.txt content.
