import {
  applyMiddleware,
  createStore,
  Dispatch as ReduxDispatch,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IApplicationState, reducers } from './Reducers';

export type Dispatch = ReduxDispatch<IApplicationState>;

let store: Store<IApplicationState> = null;

export function getStore(): Store<IApplicationState> {
  return store;
}

export function configureStore(
  initialState?: IApplicationState,
): Store<IApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  if (store) {
    return store;
  }

  store = createStore<IApplicationState>(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
}
