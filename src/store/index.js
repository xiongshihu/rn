import { createStore, compose, applyMiddleware } from 'redux';
import reactThunk from 'redux-thunk';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(reactThunk)
);

export default function configureStore(initialState) {
  const store = finalCreateStore(createStore)(rootReducer, initialState);
  return store;
}
