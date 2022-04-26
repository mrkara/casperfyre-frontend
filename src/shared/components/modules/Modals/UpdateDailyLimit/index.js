import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const UpdateDailyCSPRLimitModal = (props) => {
  const { close } = props;

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Update Daily CSPR Limit'
        subTitle='This action will update the max CSPR that can be sent each day.'
      />
      <Dialog.Body className='pt-6.25'>
        <Input placeholder='Daily Limit' />
        <p className='mt-2.5'>
          Current Daily Limit: <b>5000</b>
        </p>
      </Dialog.Body>
      <Dialog.Footer className=''>
        <Button className='w-full mt-6' color='primary'>
          Update Daily Limit
        </Button>
        <div className='mt-2.5 text-center'>
          <Link className=' text-primary underline' onClick={handleCancel}>
            Cancel
          </Link>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default UpdateDailyCSPRLimitModal;
