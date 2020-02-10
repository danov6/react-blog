import { createStore, combineReducers } from 'redux';

import home from './reducers/home';
import session from './reducers/session';

const reducers = combineReducers({
  home,
  session
});

const store = createStore(reducers);

export default store;