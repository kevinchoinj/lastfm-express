export const START_TRANSITION = Symbol('START_TRANSITION');
export const LOAD_CONTENT = Symbol('LOAD_CONTENT');
export const PREVIOUS_PAGE_NAME = Symbol('PREVIOUS_PAGE_NAME');
export const REMOVE_PREVIOUS_CONTENT = Symbol('REMOVE_PREVIOUS_CONTENT');

export const startTransition = (transitionStatus) => {
  return{
    type: START_TRANSITION,
    transitionStatus,
  };
};
export const loadContent = (location, loadStatus) => {
  return{
    type: LOAD_CONTENT,
    location,
    loadStatus,
  };
};
export const previousPageName = (pageName) => {
  return{
    type: PREVIOUS_PAGE_NAME,
    pageName,
  };
};
export const removePreviousContent = (newList) => {
  return{
    type: REMOVE_PREVIOUS_CONTENT,
    newList,
  };
};

export const startRemovePreviousContent = (pageName) => {
  return (dispatch, getState) => {
    let clone = Object.assign({}, getState().transition.loadedContent);
    delete clone[pageName];
    setTimeout(()=>
      dispatch(removePreviousContent(clone))
    , 400);
    /*leave the track in transition.loadedContent until animation has finished
      to prevent panel from suddenly disappearing */
  };
};

