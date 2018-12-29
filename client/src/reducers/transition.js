import {siteRoutes} from 'data/siteRoutes';

import {
  START_TRANSITION,
  LOAD_CONTENT,
  PREVIOUS_PAGE_NAME,
  REMOVE_PREVIOUS_CONTENT,
} from 'actions/transition';

const homeRoute = siteRoutes.home;
const currentSimilarRoute = siteRoutes.currentSimilar;

const defaultRoutes = {
  [homeRoute]: false,
  [currentSimilarRoute]: false,
};

const DEFAULT_STATE={
  transitionStatus: null,
  loadedContent: defaultRoutes,
  previousPage: '',
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case START_TRANSITION:
    state = {...state,
      transitionStatus: payload.transitionStatus};
    return state;
  case LOAD_CONTENT:
    return {
      ...state,
      loadedContent: {
        ...state.loadedContent,
        [payload.location]: payload.loadStatus,
      }
    };
  case PREVIOUS_PAGE_NAME:
    return {
      ...state,
      previousPage: payload.pageName,
    };
  case REMOVE_PREVIOUS_CONTENT:
    return {
      ...state,
      loadedContent: payload.newList,
    };
  default:
    return state;
  }
};
