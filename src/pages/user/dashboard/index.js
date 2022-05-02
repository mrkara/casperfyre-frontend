import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import APIKeyInfo from 'shared/components/modules/CardInfo/APIKey';
import WalletInfo from 'shared/components/modules/CardInfo/Wallet';
import RecentApiCalls from 'shared/components/modules/CardTables/RecentApiCalls';
import { getUserAPIKey, getUserWallet } from 'stores/api/user/actions';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState();
  const [apiKey, setApiKey] = useState();

  useEffect(() => {
    dispatch(getUserAPIKey(null, (res) => {
      setApiKey(res.detail);
    }));
    dispatch(getUserWallet(null, (res) => {
      setWallet(res.detail);
    }));
  }, []);

  return (
    <section className='section-dashboard'>
      <div className='section-body'>
        <div className='flex gap-10'>
          <APIKeyInfo data={apiKey} />
          <WalletInfo data={wallet} />
        </div>
        <div className='section-content pt-12.5'>
          <RecentApiCalls />
        </div>
      </div>
    </section>
  );
};

DashboardPage.propTypes = {};

export default DashboardPage;
