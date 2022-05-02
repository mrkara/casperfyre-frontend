import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MyApiKeys from 'shared/components/modules/CardTables/MyApiKeys';
import MyWallets from 'shared/components/modules/CardTables/MyWallets';
import { Button, CopyButton } from 'shared/components/partials';
import { getUserWallet } from 'stores/api/user/actions';

const KeysAndWalletsPage = (props) => {
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState();

  useEffect(() => {
    dispatch(getUserWallet(null, (res) => {
      setWallet(res.detail);
    }));
  }, []);

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
              <b className='whitespace-nowrap'>Active Wallet:</b> 
              <input 
                value={wallet?.address} 
                className='px-3 input-readonly-copy-text w-96 text-center'
                id="active-wallet-id"
                readOnly
              />
              <CopyButton from="active-wallet-id" />
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

export default KeysAndWalletsPage;
