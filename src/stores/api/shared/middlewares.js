import { post } from 'shared/core/services/saga';
import { types } from 'stores/types';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

function* updatePassword({ payload, resolve, reject }) {
  const user = yield select((state) => state.authReducer?.user);

  try {
    const res = yield put([user?.role, 'update-password'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* sendMFA({ payload, resolve, reject }) {
  const user = yield select((state) => state.authReducer?.user);
  try {
    const res = yield post([user?.role, 'send-mfa'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* updateMFA({ payload, resolve, reject }) {
  const user = yield select((state) => state.authReducer?.user);

  try {
    const res = yield put([user?.role, 'update-mfa'], { data: payload });
    resolve(res);
  } catch (error) {
    console.log('error', error);
    toast(error.message);
    reject(error);
  }
}

function* updateEmail({ payload, resolve, reject }) {
  const user = yield select((state) => state.authReducer?.user);

  try {
    const res = yield put([user?.role, 'update-email'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* confirmUpdateEmail({ payload, resolve, reject }) {
  const user = yield select((state) => state.authReducer?.user);

  try {
    const res = yield post([user?.role, 'confirm-update-email'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

export function* watchShared() {
  yield all([
    takeLatest(types.UPDATE_PASSWORD, updatePassword),
    takeLatest(types.SEND_MFA, sendMFA),
    takeLatest(types.UPDATE_MFA, updateMFA),
    takeLatest(types.UPDATE_EMAIL, updateEmail),
    takeLatest(types.CONFIRM_UPDATE_EMAIL, confirmUpdateEmail),
  ]);
}
