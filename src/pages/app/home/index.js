import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  approveUser,
  createAdmin,
  createWallet,
  denyUser,
  disableAPIKey,
  disableIP,
  disableUser,
  enableAPIKey,
  enableIP,
  enableUser,
  getAdmins,
  getAPIKey,
  getAPIKeys,
  getApplications,
  getHistories,
  getIps,
  getLimits,
  getUser,
  getUsers,
  getWallet,
  getWallets,
  replaceKey,
  resetUserPassword,
  sendMFA,
  updateEmail,
  updateLimits,
  updateMFA,
  updatePassword,
} from 'stores/app/actions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLimits());
    dispatch(getLimits());
    dispatch(createWallet());
    dispatch(getWallet());
    dispatch(getWallets());
    dispatch(replaceKey());
    dispatch(disableAPIKey());
    dispatch(enableAPIKey());
    dispatch(getAPIKey());
    dispatch(getAPIKeys());
    dispatch(getIps());
    dispatch(disableIP());
    dispatch(enableIP());
    dispatch(getApplications());
    dispatch(getUser());
    dispatch(getUsers());
    dispatch(approveUser());
    dispatch(denyUser());
    dispatch(enableUser());
    dispatch(disableUser());
    dispatch(resetUserPassword());
    dispatch(updatePassword());
    dispatch(getHistories());
    dispatch(getAdmins());
    dispatch(createAdmin());
    dispatch(sendMFA());
    dispatch(updateMFA());
    dispatch(updateEmail());
  }, []);

  return <div>Test CORS API !!!</div>;
};

export default Home;
