export const SET_CURRENT_PATH = Symbol('SET_CURRENT_PATH');

export const setCurrentPath = (pathName) => {
    return{
      type: SET_CURRENT_PATH,
      pathName
    };
}