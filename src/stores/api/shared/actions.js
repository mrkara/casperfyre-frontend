import { generateAPIAction } from 'shared/core/services/redux';
import { types } from 'stores/types';

export const updatePassword = generateAPIAction(types.UPDATE_PASSWORD);
export const sendMFA = generateAPIAction(types.SEND_MFA);
export const updateMFA = generateAPIAction(types.UPDATE_MFA);
export const updateEmail = generateAPIAction(types.UPDATE_EMAIL);
export const confirmUpdateEmail = generateAPIAction(types.CONFIRM_UPDATE_EMAIL);