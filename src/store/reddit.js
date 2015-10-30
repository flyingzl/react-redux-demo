import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import RedditReduceer from "../reducers/reddit";
import {CallApiMiddleware} from "../middleware";

import {compose} from "redux";
import { devTools, persistState } from 'redux-devtools';

// const createStoreWithMiddleware = applyMiddleware(
//     thunk,
//     logger()
// )(createStore);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, CallApiMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);


export default function configureStore(initialState) {
  var store = createStoreWithMiddleware(RedditReduceer, initialState);
  if( module.hot){
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reddit', () => {
      const nextRootReducer = require('../reducers/reddit');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
