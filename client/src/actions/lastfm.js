export const REQUEST_CURRENT_TRACK_STARTED = Symbol('REQUEST_CURRENT_TRACK_STARTED');
export const REQUEST_CURRENT_TRACK_SUCCEEDED = Symbol('REQUEST_CURRENT_TRACK_SUCCEEDED');
export const REQUEST_CURRENT_TRACK_FAILURE = Symbol('REQUEST_CURRENT_TRACK_FAILURE');

export const REQUEST_SIMILAR_TRACKS_STARTED = Symbol('REQUEST_SIMILAR_TRACKS_STARTED');
export const REQUEST_SIMILAR_TRACKS_SUCCEEDED = Symbol('REQUEST_SIMILAR_TRACKS_SUCCEEDED');
export const REQUEST_SIMILAR_TRACKS_FAILURE = Symbol('REQUEST_SIMILAR_TRACKS_FAILURE');

const requestCurrentTrackStarted = request => ({type: REQUEST_CURRENT_TRACK_STARTED, request});
const requestCurrentTrackSucceeded = data => ({type: REQUEST_CURRENT_TRACK_SUCCEEDED, data});
const requestCurrentTrackFailure = (data, error) => ({type: REQUEST_CURRENT_TRACK_FAILURE, data, error});

const requestSimilarTracksStarted = request => ({type: REQUEST_SIMILAR_TRACKS_STARTED, request});
const requestSimilarTracksSucceeded = data => ({type: REQUEST_SIMILAR_TRACKS_SUCCEEDED, data});
const requestSimilarTracksFailure = (data, error) => ({type: REQUEST_SIMILAR_TRACKS_FAILURE, data, error});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

/*======================================
=           CURRENT TRACK             =
======================================*/
export function requestCurrentTrack() {
  return dispatch => {
    dispatch(requestCurrentTrackStarted());
    return fetch('/current-track')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        let recentTrack = returnCurrentTrackData(json);
        dispatch(requestCurrentTrackSucceeded(recentTrack));
      })
      .catch(error => dispatch(requestCurrentTrackFailure(error)));
    }
}
function returnCurrentTrackData (json) {
  let recentTrack;
  recentTrack = json.recenttracks.track[0];
  return recentTrack;
}

/*======================================
=           SIMILAR TRACKS             =
======================================*/
function requestSimilarTracks(trackName, trackArtist) {
  return dispatch => {
    dispatch(requestSimilarTracksStarted());
    return fetch('/similar-tracks',
    {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        trackName: trackName,
        trackArtist: trackArtist,
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        let similarTracks = returnSimilarTrackData(json);
        dispatch(requestSimilarTracksSucceeded(similarTracks));
      })
      .catch(error => dispatch(requestSimilarTracksFailure(error)));
    }
}
function returnSimilarTrackData (json) {
  let similarTracks;
  similarTracks = json.similartracks.track;
  return similarTracks;
}

/*======================================
=         SIMILAR TO CURRENT           =
======================================*/
export function requestCurrentTrackThenSimilar() {
  return (dispatch, getState) => {
    return dispatch(requestCurrentTrack())
      .then(function() {
        let trackName = getState().lastfm.currentTrack.name;
        let trackArtist = getState().lastfm.currentTrack.artist["#text"];
        dispatch(requestSimilarTracks(trackName, trackArtist))
      })
    }
}
