import fetch from 'node-fetch';

const {
  sendError,
} = require('../couch.js');

const json = require('../config.json');

const LASTFM_ROOT = "http://ws.audioscrobbler.com/2.0";
const lastfmKey = json.lastfmKey;

class LastfmController {

  getCurrentTrack(req, res) {
    fetch(`${LASTFM_ROOT}/?method=user.getrecenttracks&user=shodyra&api_key=${lastfmKey}&limit=1&format=json`)
      .then(res => res.json())
      .then(body => {
        res.json(body);
      })
      .catch(error => {
        sendError('Express', error, 'lastfm get current track error');
      });
  }

  postCurrentTrack(req, res) {
    let reqBody = req.body;
    let username = reqBody.username;
    fetch(`${LASTFM_ROOT}/?method=user.getrecenttracks&user=${username}&api_key=${lastfmKey}&limit=1&format=json`)
      .then(res => res.json())
      .then(body => {
        res.json(body);
      })
      .catch(error => {
        sendError('Express', error, 'lastfm post current track error');
      });
  }

  postSimilarTracks(req, res) {
    let reqBody = req.body;
    let trackName = reqBody.trackName;
    let trackArtist = reqBody.trackArtist;
    fetch(`${LASTFM_ROOT}/?method=track.getsimilar&limit=34&artist=${trackArtist}&track=${trackName}&api_key=${lastfmKey}&format=json`)
      .then(res => res.json())
      .then(body => {
        res.json(body);
      })
      .catch(error => {
        sendError('Express', error, 'lastfm post similar tracks error');
      });
  }

  postArtistInfo(req, res) {
    let reqBody = req.body;
    let trackArtist = reqBody.trackArtist;
    fetch(`${LASTFM_ROOT}/?method=artist.getinfo&artist=${trackArtist}&api_key=${lastfmKey}&format=json`)
      .then(res => res.json())
      .then(body => {
        res.json(body);
      })
      .catch(error => {
        sendError('Express', error, 'lastfm post artist info error');
      });
  }

}

const lastfmController = new LastfmController();
export default lastfmController;