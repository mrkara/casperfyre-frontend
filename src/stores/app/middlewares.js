import { all, takeLatest } from 'redux-saga/effects';
import { get, post } from 'shared/core/services/saga';
import { fakeFilterListApi, removeEmptyField } from 'shared/core/utils';
import { types } from 'stores/types';

function* getApplications({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-applications'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getWallets({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-wallets'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getAPIKeys({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-apikeys'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getAPIKey({ payload, resolve, reject }) {
  try {
    const { id } = payload;
    const res = yield get(['admin', 'get-apikey', id]);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
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

function* getIps({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'get-ips'], payload);
    resolve({ ...res, detail: res.detail, hasMore: false });
  } catch (error) {
    reject(error);
  }
}

function* getAdmins({ payload, resolve, reject }) {
  try {
    // TODO: implement api get admin mail list
    const res = yield get(['admin', 'get-list'], payload);
    resolve({ ...res, detail: res.detail, hasMore: false });
  } catch (error) {
    reject(error);
  }
}

export function* watchApp() {
  yield all([
    takeLatest(types.GET_APPLICATIONS, getApplications),
    takeLatest(types.GET_API_KEYS, getAPIKeys),
    takeLatest(types.GET_API_KEY, getAPIKey),
    takeLatest(types.GET_WALLETS, getWallets),
    takeLatest(types.GET_HISTORIES, getHistories),
    takeLatest(types.GET_WHITE_LISTED_IPS, getIps),
    takeLatest(types.GET_ADMINS, getAdmins),
    takeLatest(types.APPROVE_USER, approveUser),
    takeLatest(types.DENY_USER, denyUser),
  ]);
}
