import {
  REQUEST_CURRENT_TRACK_SUCCEEDED,
} from 'actions/lastfm'

const DEFAULT_STATE={
  currentTrack :{},
}

export default(state=DEFAULT_STATE, payload) => {
  switch(payload.type){
    case REQUEST_CURRENT_TRACK_SUCCEEDED:
      return {
        ...state,
        currentTrack: payload.data,
      };
   default:
      return state;
  }
};
