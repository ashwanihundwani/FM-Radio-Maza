import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';

const initialState = {};


const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

export default store;