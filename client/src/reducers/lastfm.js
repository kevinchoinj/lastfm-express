import {
  REQUEST_CURRENT_TRACK_STARTED,
  REQUEST_CURRENT_TRACK_SUCCEEDED,
  REQUEST_CURRENT_TRACK_FAILURE,

  REQUEST_CURRENT_TRACK_SIMILAR_SUCCEEDED,
  REQUEST_SIMILAR_TRACKS_SUCCEEDED,

  REQUEST_CURRENT_TRACK_ARTIST_SUCCEEDED,
  REQUEST_CURRENT_TRACK_ARTIST_FAILURE,

  REQUEST_ARTIST_INFO_SUCCEEDED,
} from 'actions/lastfm'

const DEFAULT_STATE={
  currentTrackStarted: false,
  currentTrack : {},
  currentSimilar: {},
  currentArtist: {},

  selectedSimilar: {},
  selectedArtist: {},
}

export default(state=DEFAULT_STATE, payload) => {
  switch(payload.type){
    case REQUEST_CURRENT_TRACK_STARTED:
    return {
      ...state,
      currentTrackStarted: true,
    };
    case REQUEST_CURRENT_TRACK_SUCCEEDED:
      return {
        ...state,
        currentTrack: payload.data,
        currentTrackStarted: false,
      };
    case REQUEST_CURRENT_TRACK_FAILURE:
      return {
        ...state,
        currentTrackStarted: false,
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

    case REQUEST_CURRENT_TRACK_ARTIST_SUCCEEDED:
      return {
        ...state,
        currentArtist: payload.data,
      };
    case REQUEST_CURRENT_TRACK_ARTIST_FAILURE:
      return {
        ...state,
        currentArtist: {},
      };

    case REQUEST_ARTIST_INFO_SUCCEEDED:
      return {
        ...state,
        selectedArtist: payload.data,
      };
   default:
      return state;
  }
};
