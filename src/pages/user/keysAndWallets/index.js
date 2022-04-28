import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import React from 'react';
import MyApiKeys from 'shared/components/modules/CardTables/MyApiKeys';
import MyWallets from 'shared/components/modules/CardTables/MyWallets';
import { Button } from 'shared/components/partials';

const KeysAndWalletsPage = (props) => {
  return (
    <section className='section-keys-wallets'>
      <div className='section-body flex flex-col gap-y-6'>
        <div>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center py-5'>
              <p>
                <b>Active API Key</b>: a1b2c33d4e5f6g7h8i9jakblc
              </p>
              <Copy />
            </div>
            <div className='flex gap-x-2'>
              <Button size='sm' rounded className='px-5 py-6'>
                Update Limits
              </Button>
              <Button size='sm' rounded className='px-5 py-6'>
                Replace key
              </Button>
            </div>
          </div>
          <MyApiKeys />
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center py-5'>
              <p>
                <b>Active Wallet</b>: 0x3df1b5f8782b2410bc49dd63b8188a961c7c61e5
              </p>
              <Copy />
            </div>
            <div className='flex gap-x-2'>
              <Button size='sm' rounded className='px-5 py-6'>
                Change Wallet
              </Button>
            </div>
          </div>
          <MyWallets />
        </div>
      </div>
    </section>
  );
};

KeysAndWalletsPage.propTypes = {};

export default KeysAndWalletsPage;
