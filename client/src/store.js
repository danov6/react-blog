import { createStore, combineReducers } from 'redux';

import home from './reducers/home';
import user from './reducers/user';

const reducers = combineReducers({
  home,
  user
});

const store = createStore(reducers);

export default store;