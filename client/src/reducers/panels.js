import {
  TOGGLE_CURRENT_SIMILAR,
} from 'actions/panels'

const DEFAULT_STATE={
  currentSimilar: false,
}

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
    case TOGGLE_CURRENT_SIMILAR:
      return state = {...state, currentSimilar: payload.display};
    default:
      return state;
  }
};
