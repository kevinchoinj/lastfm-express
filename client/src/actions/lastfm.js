export const REQUEST_CURRENT_TRACK_STARTED = Symbol('REQUEST_CURRENT_TRACK_STARTED');
export const REQUEST_CURRENT_TRACK_SUCCEEDED = Symbol('REQUEST_CURRENT_TRACK_SUCCEEDED');
export const REQUEST_CURRENT_TRACK_FAILURE = Symbol('REQUEST_CURRENT_TRACK_FAILURE');

export const REQUEST_CURRENT_TRACK_SIMILAR_STARTED = Symbol('REQUEST_CURRENT_TRACK_SIMILAR_STARTED');
export const REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED = Symbol('REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED');
export const REQUEST_CURRENT_TRACK_SIMILAR_FAILURE = Symbol('REQUEST_CURRENT_TRACK_SIMILAR_FAILURE');

export const REQUEST_SIMILAR_TRACKS_STARTED = Symbol('REQUEST_SIMILAR_TRACKS_STARTED');
export const REQUEST_SIMILAR_TRACKS_SUCCEEDED = Symbol('REQUEST_SIMILAR_TRACKS_SUCCEEDED');
export const REQUEST_SIMILAR_TRACKS_FAILURE = Symbol('REQUEST_SIMILAR_TRACKS_FAILURE');

const requestCurrentTrackStarted = request => ({type: REQUEST_CURRENT_TRACK_STARTED, request});
const requestCurrentTrackSucceeded = data => ({type: REQUEST_CURRENT_TRACK_SUCCEEDED, data});
const requestCurrentTrackFailure = (data, error) => ({type: REQUEST_CURRENT_TRACK_FAILURE, data, error});

const requestCurrentTrackSimilarStarted = request => ({type: REQUEST_CURRENT_TRACK_SIMILAR_STARTED, request});
const requestCurrentTrackSimilarSucceeded = data => ({type: REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED, data});
const requestCurrentTrackSimilarFailure = (data, error) => ({type: REQUEST_CURRENT_TRACK_SIMILAR_FAILURE, data, error});

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
function fetchCurrentTrack() {
  return () => {
    return fetch('/current-track');
  }
}
export function requestCurrentTrack() {
  return (dispatch, getState) => {
    dispatch(requestCurrentTrackStarted());
    return dispatch(fetchCurrentTrack())
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        let recentTrack = returnCurrentTrackData(json);
        //Check if currently stored track is the same as received track
        if (getState().lastfm.currentTrack.name !== recentTrack.name) {
          dispatch(requestCurrentTrackSucceeded(recentTrack));
        }
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

function fetchSimilarTracks(trackName, trackArtist) {
  return () => {
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
  }
}

export function requestSimilarTrackOfCurrent () {
  return (dispatch, getState) => {
    dispatch(requestCurrentTrackSimilarStarted());
    let trackName = getState().lastfm.currentTrack.name;
    let trackArtist = getState().lastfm.currentTrack.artist["#text"];
    return dispatch(fetchSimilarTracks(trackName, trackArtist))
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      let similarTracks = returnSimilarTrackData(json);
      dispatch(requestCurrentTrackSimilarSucceeded(similarTracks));
    })
    .catch(error => dispatch(requestCurrentTrackSimilarFailure(error)));
  }
}
export function requestSimilarTracks(trackName, trackArtist) {
  return dispatch => {
    dispatch(requestSimilarTracksStarted());
    return dispatch(fetchSimilarTracks(trackName, trackArtist))
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
        //if currently stored track is not the same as received track, get new similar tracks
        if (!getState().lastfm.currentTrackStarted) {
          dispatch(requestSimilarTrackOfCurrent())
        }
      })
    }
}

