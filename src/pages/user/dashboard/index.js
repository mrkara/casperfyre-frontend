import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import APIKeyInfo from 'shared/components/modules/CardInfo/APIKey';
import WalletInfo from 'shared/components/modules/CardInfo/Wallet';
import RecentApiCalls from 'shared/components/modules/CardTables/RecentApiCalls';
import { useLoading } from 'shared/components/modules/Loading';
import { getUserAPIKey, getUserWallet } from 'stores/api/user/actions';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { setLoading } = useLoading();

  const [wallet, setWallet] = useState();
  const [apiKey, setApiKey] = useState();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getUserAPIKey(null, (res) => {
        setApiKey(res.detail);
        setLoading(false);
      })
    );
    dispatch(
      getUserWallet(null, (res) => {
        setWallet(res.detail);
        setLoading(false);
      })
    );
  }, []);

  return (
    <section className='section-dashboard h-full'>
      <div className='section-body h-full flex flex-col'>
        <div className='flex gap-10'>
          <APIKeyInfo data={apiKey} />
          <WalletInfo data={wallet} />
        </div>
        <div className='section-content pt-12.5 flex-1 min-h-0'>
          <RecentApiCalls />
        </div>
      </div>
    </section>
  );
};

DashboardPage.propTypes = {};

export default DashboardPage;
