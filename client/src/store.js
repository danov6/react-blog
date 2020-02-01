import { createStore, combineReducers } from 'redux';

import home from './reducers/home';

const reducers = combineReducers({
  home,
});

const store = createStore(reducers);

export default store;