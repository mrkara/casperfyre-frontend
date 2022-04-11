import { generateAPIAction } from 'shared/core/services/redux';
import { types } from 'stores/types';

export const signUp = generateAPIAction(types.SIGN_UP);
export const login = generateAPIAction(types.LOGIN);
export const sendLoginMail = generateAPIAction(types.SEND_LOGIN_MAIL);
export const resetPassword = generateAPIAction(types.RESET_PASSWORD);
export const forgotPassword = generateAPIAction(types.FORGOT_PASSWORD);

export const setUser = (payload) => ({
  type: types.SET_USER,
  payload,
});
