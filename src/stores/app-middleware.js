import { all } from 'redux-saga/effects';
import { watchAuth } from './auth/middlewares';

export default function* appMiddleware() {
  yield all([watchAuth()]);
}
