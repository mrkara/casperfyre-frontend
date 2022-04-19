import { all, takeLatest } from 'redux-saga/effects';
import { get, post } from 'shared/core/services/saga';
import { types } from 'stores/types';

function* getApplications({ payload, resolve, reject }) {
  try {
    const { offset } = payload;
    const res = yield get(['admin', 'get-applications'], payload);
    const hasMore = res.detail.length + 1 - offset * 2 === 0 ? false : true;
    resolve({ ...res, detail: res.detail.splice((offset - 1) * 2, 2), hasMore });
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

function* approveUser({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'approve-user'], { data: payload });
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* denyUser({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'deny-user'], { data: payload });
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
    takeLatest(types.APPROVE_USER, approveUser),
    takeLatest(types.DENY_USER, denyUser),
  ]);
}
