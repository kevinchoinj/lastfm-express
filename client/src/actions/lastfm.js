export const REQUEST_CURRENT_TRACK_STARTED = Symbol('REQUEST_CURRENT_TRACK_STARTED');
export const REQUEST_CURRENT_TRACK_SUCCEEDED = Symbol('REQUEST_CURRENT_TRACK_SUCCEEDED');
export const REQUEST_CURRENT_TRACK_FAILURE = Symbol('REQUEST_CURRENT_TRACK_FAILURE');

const requestCurrentTrackStarted = request => ({type: REQUEST_CURRENT_TRACK_STARTED, request});
const requestCurrentTrackSucceeded = data => ({type: REQUEST_CURRENT_TRACK_SUCCEEDED, data});
const requestCurrentTrackFailure = (data, error) => ({type: REQUEST_CURRENT_TRACK_FAILURE, data, error});

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


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}