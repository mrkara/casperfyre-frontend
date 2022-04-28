import React from 'react';
import APIKeyInfo from 'shared/components/modules/CardInfo/APIKey';
import WalletInfo from 'shared/components/modules/CardInfo/Wallet';
import RecentApiCalls from 'shared/components/modules/CardTables/RecentApiCalls';

const DashboardPage = (props) => {
  return (
    <section className='section-dashboard'>
      <div className='section-body'>
        <div className='flex gap-10'>
          <APIKeyInfo />
          <WalletInfo />
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
