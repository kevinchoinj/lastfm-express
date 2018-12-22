const fetch = require('node-fetch');
const express = require("express");
var bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const LASTFM_ROOT = "http://ws.audioscrobbler.com/2.0";

let lastfmKey;

try{
  let json = require('./config.json');
  lastfmKey = json.lastfmKey;
}
catch(err){
  lastfmKey = process.env.REACT_APP_LASTFM_KEY;
}
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/current-track', (req, res) => {
  fetch(LASTFM_ROOT +"/?method=user.getrecenttracks&user=shodyra&api_key="+lastfmKey+"&limit=1&format=json")
    .then(res => res.json())
    .then(body => {
      res.json(body);
    }
  );
});

app.post('/current-track', (req, res) => {
  let reqBody = req.body;
  let username = reqBody.username;
  fetch(LASTFM_ROOT +"/?method=user.getrecenttracks&user="+username+"&api_key="+lastfmKey+"&limit=1&format=json")
    .then(res => res.json())
    .then(body => {
      res.json(body);
    }
  );
});

app.post('/similar-tracks', urlencodedParser, (req, res) => {
  let reqBody = req.body;
  let trackName = reqBody.trackName;
  let trackArtist = reqBody.trackArtist;
  fetch(LASTFM_ROOT +"/?method=track.getsimilar&limit=40&artist="+trackArtist+"&track="+trackName+"&api_key="+lastfmKey+"&format=json")
    .then(res => res.json())
    .then(body => {
      res.json(body);
    }
  );
});

app.post('/artist-info', urlencodedParser, (req, res) => {
  let reqBody = req.body;
  let trackArtist = reqBody.trackArtist;
  fetch(LASTFM_ROOT +"/?method=artist.getinfo&artist="+trackArtist+"&api_key="+lastfmKey+"&format=json")
    .then(res => res.json())
    .then(body => {
      res.json(body);
    }
  );
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build'));
});

const port = process.env.PORT || 5000;

server = app.listen(port, function(){
  console.log(`server is running on port ${port}`)
})

