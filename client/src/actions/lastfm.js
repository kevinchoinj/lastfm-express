export const UPDATE_USERNAME = Symbol('UPDATE_USERNAME');

export const REQUEST_CURRENT_TRACK_STARTED = Symbol('REQUEST_CURRENT_TRACK_STARTED');
export const REQUEST_CURRENT_TRACK_SUCCEEDED = Symbol('REQUEST_CURRENT_TRACK_SUCCEEDED');
export const REQUEST_CURRENT_TRACK_FAILURE = Symbol('REQUEST_CURRENT_TRACK_FAILURE');

export const REQUEST_CURRENT_TRACK_SIMILAR_STARTED = Symbol('REQUEST_CURRENT_TRACK_SIMILAR_STARTED');
export const REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED = Symbol('REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED');
export const REQUEST_CURRENT_TRACK_SIMILAR_FAILURE = Symbol('REQUEST_CURRENT_TRACK_SIMILAR_FAILURE');

export const REQUEST_CURRENT_TRACK_ARTIST_STARTED = Symbol('REQUEST_CURRENT_TRACK_ARTIST_STARTED');
export const REQUEST_CURRENT_TRACK_ARTIST_SUCCEEDED = Symbol('REQUEST_CURRENT_TRACK_ARTIST_SUCCEEDED');
export const REQUEST_CURRENT_TRACK_ARTIST_FAILURE = Symbol('REQUEST_CURRENT_TRACK_ARTIST_FAILURE');

export const REQUEST_SIMILAR_TRACKS_STARTED = Symbol('REQUEST_SIMILAR_TRACKS_STARTED');
export const REQUEST_SIMILAR_TRACKS_SUCCEEDED = Symbol('REQUEST_SIMILAR_TRACKS_SUCCEEDED');
export const REQUEST_SIMILAR_TRACKS_FAILURE = Symbol('REQUEST_SIMILAR_TRACKS_FAILURE');

export const REQUEST_ARTIST_INFO_STARTED = Symbol('REQUEST_ARTIST_INFO_STARTED');
export const REQUEST_ARTIST_INFO_SUCCEEDED = Symbol('REQUEST_ARTIST_INFO_SUCCEEDED');
export const REQUEST_ARTIST_INFO_FAILURE = Symbol('REQUEST_ARTIST_INFO_FAILURE');

const requestCurrentTrackStarted = request => ({type: REQUEST_CURRENT_TRACK_STARTED, request});
const requestCurrentTrackSucceeded = data => ({type: REQUEST_CURRENT_TRACK_SUCCEEDED, data});
const requestCurrentTrackFailure = (data, error) => ({type: REQUEST_CURRENT_TRACK_FAILURE, data, error});

const requestCurrentTrackSimilarStarted = request => ({type: REQUEST_CURRENT_TRACK_SIMILAR_STARTED, request});
const requestCurrentTrackSimilarSucceeded = data => ({type: REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED, data});
const requestCurrentTrackSimilarFailure = (data, error) => ({type: REQUEST_CURRENT_TRACK_SIMILAR_FAILURE, data, error});

const requestCurrentTrackArtistStarted = request => ({type: REQUEST_CURRENT_TRACK_ARTIST_STARTED, request});
const requestCurrentTrackArtistSucceeded = data => ({type: REQUEST_CURRENT_TRACK_ARTIST_SUCCEEDED, data});
const requestCurrentTrackArtistFailure = (data, error) => ({type: REQUEST_CURRENT_TRACK_ARTIST_FAILURE, data, error});

const requestSimilarTracksStarted = request => ({type: REQUEST_SIMILAR_TRACKS_STARTED, request});
const requestSimilarTracksSucceeded = data => ({type: REQUEST_SIMILAR_TRACKS_SUCCEEDED, data});
const requestSimilarTracksFailure = (data, error) => ({type: REQUEST_SIMILAR_TRACKS_FAILURE, data, error});

const requestArtistInfoStarted = request => ({type: REQUEST_ARTIST_INFO_STARTED, request});
const requestArtistInfoSucceeded = data => ({type: REQUEST_ARTIST_INFO_SUCCEEDED, data});
const requestArtistInfoFailure = (data, error) => ({type: REQUEST_ARTIST_INFO_FAILURE, data, error});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

/*======================================
=          UPDATE USERNAME            =
======================================*/
export const updateUsername = (values) => {
    return {
      type: UPDATE_USERNAME,
      payload: values.username,
    };
}

export const updateUsernameThenUpdate = (values) => {
  return (dispatch) => {
    dispatch(updateUsername(values));
    dispatch(requestCurrentTrackThenArtistSimilar());
  };
}

/*======================================
=           CURRENT TRACK             =
======================================*/
function fetchCurrentTrack(username) {
  return () => {
    return fetch('/current-track',
    {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: encodeURIComponent(username),
      })
    })
  }
}
function fetchCurrentTrackWithUsername() {
  return (dispatch, getState) => {
    return dispatch(fetchCurrentTrack(getState().lastfm.currentUser));
  }
}

export function requestCurrentTrack() {
  return (dispatch, getState) => {
    dispatch(requestCurrentTrackStarted());
    return dispatch(fetchCurrentTrackWithUsername())
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
        trackName: encodeURIComponent(trackName),
        trackArtist: encodeURIComponent(trackArtist),
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
=             ARTIST INFO             =
======================================*/
function fetchArtist(trackArtist) {
  return () => {
    return fetch('/artist-info',
    {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        trackArtist: encodeURIComponent(trackArtist),
      })
    })
  }
}
export function requestArtistOfCurrent () {
  return (dispatch, getState) => {
    dispatch(requestCurrentTrackArtistStarted());
    let trackArtist = getState().lastfm.currentTrack.artist["#text"];
    return dispatch(fetchArtist(trackArtist))
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      let artistData = returnArtistData(json);
      dispatch(requestCurrentTrackArtistSucceeded(artistData));
    })
    .catch(error => dispatch(requestCurrentTrackArtistFailure(error)));
  }
}
export function requestArtistInfo(trackArtist) {
  return dispatch => {
    dispatch(requestArtistInfoStarted());
    return dispatch(fetchArtist(trackArtist))
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      let artistData = returnSimilarTrackData(json);
      dispatch(requestArtistInfoSucceeded(artistData));
    })
    .catch(error => dispatch(requestArtistInfoFailure(error)));
    }
}
function returnArtistData (json) {
  let artistData;
  artistData = json.artist;
  return artistData;
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
/*======================================
=      CURRENT TRACK ARTIST INFO       =
======================================*/
export function requestCurrentTrackThenArtist() {
  return (dispatch, getState) => {
    return dispatch(requestCurrentTrack())
      .then(function() {
        //if currently stored track is not the same as received track, get new similar tracks
        if (!getState().lastfm.currentTrackStarted) {
          dispatch(requestArtistOfCurrent())
        }
      })
    }
}
/*======================================
=    CURRENT TRACK ARTIST/SIMILAR      =
======================================*/
export function requestCurrentTrackThenArtistSimilar() {
  return (dispatch, getState) => {
    return dispatch(requestCurrentTrack())
      .then(function() {
        //if currently stored track is not the same as received track, get new similar tracks
        if (!getState().lastfm.currentTrackStarted) {
          dispatch(requestSimilarTrackOfCurrent())
          .then(dispatch(requestArtistOfCurrent()));
        }
      })
    }
}

