import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';

import { ApplicationState, reducers } from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(initialState: ApplicationState,): Store<ApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  return createStore<ApplicationState>(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk)
    ));
}
