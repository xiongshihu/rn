import { createStore, compose, applyMiddleware } from 'redux';
import reactThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import catFetch from '../middleware/catFetch';
import rootReducer from '../reducers';

const logger = createLogger();
const finalCreateStore = compose(
  applyMiddleware(reactThunk),
  applyMiddleware(catFetch),
  applyMiddleware(logger)
);

export default function configureStore(initialState) {
  const store = finalCreateStore(createStore)(rootReducer, initialState);
  return store;
}
