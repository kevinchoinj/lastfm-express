export const TOGGLE_CURRENT_SIMILAR = Symbol('TOGGLE_CURRENT_SIMILAR');

export const toggleCurrentSimilar = (display) =>{
    return{
      type: TOGGLE_CURRENT_SIMILAR,
      display
    };
}