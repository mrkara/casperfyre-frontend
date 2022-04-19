import { combineReducers } from "redux";
import { createReducer } from "shared/core/services/redux";

const userInitialState = null;

const setUser = (state, payload) => {
  return {
    ...state,
    ...payload,
  };
};

const updateUser = (state, payload) => ({ ...state, ...payload });

const clearUser = () => userInitialState;

const userStrategies = {
  SET_USER: setUser,
  UPDATE_USER: updateUser,
  CLEAR_USER: clearUser,
  __default__: (state) => state,
};

export const user = createReducer(userStrategies, userInitialState);

export const authReducer = combineReducers({
  user,
});
