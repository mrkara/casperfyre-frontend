import { all } from 'redux-saga/effects';
import { watchApp } from './app/middlewares';
import { watchAuth } from './auth/middlewares';

export default function* appMiddleware() {
  yield all([watchAuth(), watchApp()]);
}
