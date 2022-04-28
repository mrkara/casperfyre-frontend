import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import Logo from 'assets/images/casper-logo.png';
import React from 'react';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';

const WalletInfo = () => {
  return (
    <Card className='max-w-4xl'>
      <CardHeader icon={<Wallet />} title='Wallet'>
        <p className='flex'>
          Balance:
          <img className='ml-3 mr-1 w-4' src={Logo} alt='logo' />
          <b className='text-primary'>30</b>
        </p>
      </CardHeader>
      <CardBody className='flex flex-col justify-center items-center px-36 py-20'>
        <div className='flex items-center gap-x-4 text-sm font-semibold'>
          <p>01xa1b6s6d5tu4beth5w587w65s0010b</p>
          <Copy />
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
