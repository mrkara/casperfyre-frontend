import { all, takeLatest } from 'redux-saga/effects';
import { get } from 'shared/core/services/saga';
import { types } from 'stores/types';

function* getApplications({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'get-applications'], payload);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getAPIKeys({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'get-apikeys'], payload);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getWallets({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'get-wallets'], payload);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getHistories({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'history'], payload);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

export function* watchApp() {
  yield all([
    takeLatest(types.GET_APPLICATIONS, getApplications),
    takeLatest(types.GET_API_KEYS, getAPIKeys),
    takeLatest(types.GET_WALLETS, getWallets),
    takeLatest(types.GET_HISTORIES, getHistories),
  ]);
}
