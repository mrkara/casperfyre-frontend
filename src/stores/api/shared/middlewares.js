import { get } from 'shared/core/services/saga';
import * as types from 'stores/types';
import { all, takeLatest } from 'redux-saga/effects';

// function* getList({ resolve, reject }) {
//   try {
//     const res = yield get(['/'], {});
//     resolve(res);
//   } catch (error) {
//     reject(error);
//   }
// }


export function* watchShared() {
  yield all([
    // takeLatest(types.GET_LIST, getList),
  ]);
}
