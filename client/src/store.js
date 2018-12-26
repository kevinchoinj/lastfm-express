import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import { connectRouter} from 'connected-react-router';
import createHistory from 'history/createBrowserHistory'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import reducers from './reducers';

export const history = createHistory()

export default(initialState)=>{
  return createStore(
     combineReducers({
       ...reducers,
       router: connectRouter(history),
     }),
    initialState,
    compose(
      applyMiddleware(
        thunk,
        createLogger({
          duration: true,
          predicate: () => process.env.NODE_ENV !== 'production',
          actionTransformer: action => ({
            ...action,
            type: String(action.type),
          }),
        }),
      ),
    ),
  );
}

