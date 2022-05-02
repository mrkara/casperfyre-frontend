import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import Logo from 'assets/images/casper-logo.png';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CopyButton } from 'shared/components/partials';

const WalletInfo = ({ data }) => {
  return (
    <Card className='w-1/2 max-w-lg  h-60'>
      <CardHeader icon={<Wallet />} title='Wallet'>
        <p className='flex'>
          Balance:
          <img className='ml-3 mr-1 w-4' src={Logo} alt='logo' />
          <b className='text-primary'>{data?.balance}</b>
        </p>
      </CardHeader>
      <CardBody className='flex flex-col justify-center items-center'>
        <div className='w-full flex items-center gap-x-4 text-sm font-semibold'>
          <textarea
            className='input-readonly-copy-text w-full text-center'
            id="wallet-address-id"
            value={data?.address}
            readOnly
          />
          <CopyButton from="wallet-address-id" />
        </div>
        <Button size='sm' rounded className='mt-3'>
          Replace Key
        </Button>
      </CardBody>
    </Card>
  );
};

WalletInfo.propTypes = {};

export default WalletInfo;
