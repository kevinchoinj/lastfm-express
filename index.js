const fetch = require('node-fetch');
const express = require("express");

const path = require('path');
const app = express();

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

app.get('/current-track', (req, res) => {
  fetch(LASTFM_ROOT +"/?method=user.getrecenttracks&user=shodyra&api_key="+lastfmKey+"&limit=1&format=json")
    .then(res => res.json())
    .then(body => {
      res.json(body);
    }
  );
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;

server = app.listen(port, function(){
  console.log(`server is running on port ${port}`)
})
