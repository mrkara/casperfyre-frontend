import { all } from 'redux-saga/effects';
import { watchShared } from './api/shared/middlewares';

export default function* appMiddleware() {
  yield all([
    watchShared(),
  ]);
}
