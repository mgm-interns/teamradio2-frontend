import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IApplicationState, reducers } from './Reducers';

export function configureStore(
  initialState?: IApplicationState,
): Store<IApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  return createStore<IApplicationState>(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
