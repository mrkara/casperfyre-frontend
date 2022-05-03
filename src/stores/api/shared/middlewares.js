import { toast } from 'react-toastify';
import { all, put as putSaga, select, takeLatest } from 'redux-saga/effects';
import { post, put } from 'shared/core/services/saga';
import { setUser } from 'stores/auth/actions';
import { types } from 'stores/types';

function* updatePassword({ payload, resolve, reject }) {
  const user = yield select((state) => state.authReducer?.user);
  try {
    const res = yield put([user?.role, 'update-password'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    console.error(error);
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
    yield putSaga(setUser({ twofa: payload.active ? '1' : '0' }));
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
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
