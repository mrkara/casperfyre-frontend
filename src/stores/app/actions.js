import { generateAPIAction } from 'shared/core/services/redux';
import { types } from 'stores/types';

export const getApplications = generateAPIAction(types.GET_APPLICATIONS);
export const getAPIKeys = generateAPIAction(types.GET_API_KEYS);
export const getWallets = generateAPIAction(types.GET_WALLETS);
export const getHistories = generateAPIAction(types.GET_HISTORIES);

export const approveUser = generateAPIAction(types.APPROVE_USER);
export const denyUser = generateAPIAction(types.DENY_USER);
