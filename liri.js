require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

var input = process.argv;

var commands = input[2];

var requestElement = input.slice(3).join("");

var resultData;

console.log(
  "You have entered the following command: " +
    commands +
    " " +
    requestElement +
    "\n"
);

var searchLogic = function() {
  switch (commands) {
    case "spotify-this-song":
      songSearch();
      break;

    case "concert-this":
      concertSearch();
      break;

    case "movie-this":
      movieSearch();
      break;

    //additional command is do-what-it-says, run above commands according to randm.txt content.

    case "do-what-it-says":
      fs.readFile("./random.txt", "utf-8", function(err, data) {
        if (err) {
          throw err;
        }

        //console.log(data);

        var dataArr = data.split(",");

        //console.log(dataArr);

        commands = dataArr[0];

        requestElement = dataArr[1];

        searchLogic();
      });
  }
};

//First, create Spotify related data request, and command functions
//spotify command is spotify-this-song

function songSearch() {
  spotify
    .search({
      type: "track",
      query: requestElement,
      limit: 1
    })
    .then(function(response) {
      var result = response.tracks.items;
      for (let i = 0; i < result.length; i++) {
        resultData =
          "================================================" +
          "\n\nArtists: " +
          result[i].artists[i].name +
          "\n\nThe Song's name: " +
          result[i].name +
          "\n\nA preview link of the song from Spotify: " +
          result[i].preview_url +
          "\n\nThe album that the song is from: " +
          result[i].album.name +
          "\n\n================================================";
        console.log(resultData);
        dataLog();
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

//Second, create BandsInTown related data request, and command functions
//BandsInTown command is concert-this

function concertSearch() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        requestElement +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      var result = response.data[0];
      var eventDate = moment(result.datetime).format("MM/DD/YYYY");
      resultData =
        "\n\nYou can find events information below:\n================================================\nName(s) of the venue: " +
        result.venue.name +
        "\n\nVenue location(s): " +
        result.venue.city +
        ", " +
        result.venue.region +
        ", " +
        result.venue.country +
        "\n\nDate(s) of the Event(s): " +
        eventDate +
        "\n\n================================================";
      console.log(resultData);
      dataLog();
    });
}

//Third, create omdb related data request, and command functions
//omdb command is movie-this

function movieSearch() {
  switch (requestElement) {
    case "":
      var defaultMovie = "Mr.Nobody";
      axios
        .get(
          "http://www.omdbapi.com/?t=" +
            defaultMovie +
            "&y=&plot=short&apikey=trilogy"
        )
        .then(function(response) {
          var result = response.data;
          resultData =
            "================================================" +
            "\n\nTitle of the Movie: " +
            result.Title +
            "\n\nYear the movie came out: " +
            result.Year +
            "\n\nIMDB Rating of the movie: " +
            result.imdbRating +
            "\n\nRotten Tomatoes Rating of the movie: " +
            result.Ratings[1].Value +
            "\n\nCountry where the movie was produced: " +
            result.Country +
            "\n\nLanguage of the movie: " +
            result.Language +
            "\n\nPlot of the movie: " +
            result.Plot +
            "\n\nActors in the movie: " +
            result.Actors +
            "\n\n================================================";
          console.log(resultData);
          dataLog();
        });
      break;

    default:
      axios
        .get(
          "http://www.omdbapi.com/?t=" +
            requestElement +
            "&y=&plot=short&apikey=trilogy"
        )
        .then(function(response) {
          var result = response.data;
          //console.log(result);
          resultData =
            "================================================" +
            "\n\nTitle of the Movie: " +
            result.Title +
            "\n\nYear the movie came out: " +
            result.Year +
            "\n\nIMDB Rating of the movie: " +
            result.imdbRating +
            "\n\nRotten Tomatoes Rating of the movie: " +
            result.Ratings[1].Value +
            "\n\nCountry where the movie was produced: " +
            result.Country +
            "\n\nLanguage of the movie: " +
            result.Language +
            "\n\nPlot of the movie: " +
            result.Plot +
            "\n\nActors in the movie: " +
            result.Actors +
            "\n\n================================================";
          console.log(resultData);
          dataLog();
        });
  }
}

function dataLog() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  try {
    fs.appendFileSync(
      "log.txt",
      "__________________________________________________" +
        "\n\nLast commands entered: " +
        commands +
        " " +
        requestElement +
        "\n\nTime entered: " +
        dateTime +
        "\n\nSearch Result:\n" +
        resultData +
        "\n__________________________________________________\n",
      "utf8"
    );
    console.log("~ Current session data has been logged! ~");
  } catch (err) {
    console.log(err);
  }
}

searchLogic();
