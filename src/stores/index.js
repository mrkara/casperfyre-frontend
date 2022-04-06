import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from 'stores/app-reducers';
import appMiddleware from 'stores/app-middleware';
import { logger } from 'redux-logger';

const saga = createSagaMiddleware();

const middlewares = [saga];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(appReducer);
saga.run(appMiddleware);

export default store;
