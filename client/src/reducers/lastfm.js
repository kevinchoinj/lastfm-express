import {
  REQUEST_CURRENT_TRACK_SUCCEEDED,
  REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED,
  REQUEST_SIMILAR_TRACKS_SUCCEEDED,
} from 'actions/lastfm'

const DEFAULT_STATE={
  currentTrack : {},
  currentSimilar: {},
  selectedSimilar: {},
}

export default(state=DEFAULT_STATE, payload) => {
  switch(payload.type){
    case REQUEST_CURRENT_TRACK_SUCCEEDED:
      return {
        ...state,
        currentTrack: payload.data,
      };
    case REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED:
      return {
        ...state,
        currentSimilar: payload.data,
      };
    case REQUEST_SIMILAR_TRACKS_SUCCEEDED:
      return {
        ...state,
        selectedSimilar: payload.data,
      };
   default:
      return state;
  }
};
