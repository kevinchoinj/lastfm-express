import {
  SET_CURRENT_PATH,
} from 'actions/panels';

const DEFAULT_STATE={
  currentPath: '',
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case SET_CURRENT_PATH:
    return state = {
      ...state,
      currentPath: payload.pathName
    };
  default:
    return state;
  }
};
