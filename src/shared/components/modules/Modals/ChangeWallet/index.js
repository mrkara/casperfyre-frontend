import { ReactComponent as Add } from 'assets/icons/add.svg';
import Logo from 'assets/images/casper-logo.png';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const ChangeWalletModal = (props) => {
  const { close } = props;

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Change Wallet'
        subTitle='This action will change the deposit wallet. The old wallet will become inactive but can still be viewed in
              the wallets table. This action can not be undone.'
      />
      <Dialog.Body className='mt-7.5'>
        <p>
          Current Wallet: <b>0x24232fdq32435gw23ef42de532e67</b>
        </p>
        <p className='flex'>
          CSPR Balance: <img className='ml-2 mr-1' width={14} height={14} src={Logo} alt='logo' /> <b>250,699</b>
        </p>
      </Dialog.Body>
      <Dialog.Footer>
        <Button className='w-full mt-6' color='primary' onClick={handleCancel}>
          <Add className='mr-2 text-xs' />
          Generate a new deposit wallet
        </Button>
        <div className='mt-2.5 text-center'>
          <Link className={classNames('text-primary underline')} onClick={handleCancel}>
            Cancel
          </Link>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ChangeWalletModal;
