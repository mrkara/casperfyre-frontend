import { all, takeLatest } from 'redux-saga/effects';
import { setGuid } from 'shared/core/services/auth';
import { get, post } from 'shared/core/services/saga';
import { types } from 'stores/types';

function* login({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'login'], { data: payload });
    setGuid(res.detail?.guid);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* sendLoginMail({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'name-by-email'], { email: payload });
    resolve(res.detail);
  } catch (error) {
    reject(error);
  }
}

function* resetPassword({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'reset-password'], { data: payload });
    resolve(res.data);
  } catch (error) {
    reject(error);
  }
}

function* forgotPassword({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'forgot-password'], { data: payload });
    resolve(res.data);
  } catch (error) {
    reject(error);
  }
}

function* register({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'register'], { data: payload });
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* verifyCode({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'submit-mfa'], { data: payload });
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

export function* watchAuth() {
  yield all([
    takeLatest(types.LOGIN, login),
    takeLatest(types.SIGN_UP, register),
    takeLatest(types.SEND_LOGIN_MAIL, sendLoginMail),
    takeLatest(types.RESET_PASSWORD, resetPassword),
    takeLatest(types.FORGOT_PASSWORD, forgotPassword),
    takeLatest(types.VERIFY_CODE, verifyCode),
  ]);
}
