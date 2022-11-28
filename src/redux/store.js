import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { coursesReducer } from './reducers/coursesReducer';
import { loaderReducer } from './reducers/loaderReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  coursesReducer: coursesReducer,
  loaderReducer: loaderReducer,
  usersReducer: usersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
