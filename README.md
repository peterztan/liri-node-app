# The LIRI Bot

### Introducing the application

LIRI bot is a Language Interpretation and Recognition Interface. It is a command line node application that takes in parameters such as song names, singer's name and movie name and gives back a curated list of related data.

### The Structuring

##### Here's a break-down of this application:

- The application uses a main `liri.js` file to house the main codes.
- The `package.json` houses information about the npm packages that were utilized in this application.
- The `package-lock.json` helps users to install the identical package version as were used in this application.
- The `random.txt` file houses a single string of text that serves as the input for one of the commands.
- The `keys.js` file houses the API key for the Song Search command.
- The main `liri.js` is a javascript file that utilizes all of the above files for functionality of this application.

### But HOW does it work?

##### The functionality of this application:

1. The application utilize the command line terminal for user input.
2. The terminal then takes a user's input and utilizes LIRI to make requests with specific queries to appropriate databases.
3. The databases then returns related data, where LIRI receives and parse the resulting data into a curated list of related information about what the user requested.
4. LIRI then displays the list onto the command line terminal as well as logging the inputed command, the date and time the command was entered, as well as the resulting data list into a log.txt file.
5. As the session data gets logged, LIRI informs the user that the data has been logged successfully.

### So How am I going to use it?

##### Step-wise instructions on how to use LIRI:

1. Clone this repository onto your local machine.
2. Open up your GitBash terminal, or just the terminal if you are using Linux or Mac.
3. Type `npm i` or `npm install` (as shown below), and the related packages as well as their dependencies will be installed.

    ![Image of `npm i`](/screenshots/npm-install.png)

    ![Image of `npm install`](/screenshots/npm-install2.png)

4. In the root file, create a `.env` file either by manually creating it, or by typing `touch .env`.
5. In the `.env` file, drop the following texts (you will have to drop your own spotify api keys in place of the `your-spotify-id` and `your-spotify-secret`):

    ```
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

    ```
6. After setting everything up, go back to the command terminal and choose one of the four following commands to type in (you will have to replace the text in quotes with your own search targets):

    ```
    node liri.js spotify-this-song "song name"
    node liri.js concert-this "singer name"
    node liri.js movie-this "movie title"
    node liri.js do-what-it-says

    ```
    - If you chose `node liri.js spotify-this-song "song name"`, LIRI will search the `spotify web api` database for data relating to your search target, and will format and output the resulting data in a readable format as shown below:

    ![Image of `node liri.js spotify-this-song "song name"`](/screenshots/spotify-this-song.png)

    - and LIRI will log this specific session of your search in a `log.txt` file, as shown below:

    ![Image of `log.txt`](/screenshots/log-txt-1.png)

    - If you chose `node liri.js concert-this "singer name"`, LIRI will search the `Bandsintown api` database for data relating to your search target, and will format and output the resulting data in a readable format as shown below:

    ![Image of `node liri.js concert-this "singer name"`](/screenshots/concert-this.png)

    - and LIRI will log this specific session of your search in a `log.txt` file, as shown below (note that if you entered multiple commands, their results will be logged in the `log.txt` file in order):

    ![Image of `log.txt`](/screenshots/log-txt-2.png)

Contain a link to a deployed version of the app
Clearly list the technologies used in the app
State your role in the app development