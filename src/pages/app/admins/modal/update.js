import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const UpdateEmailAdminModal = (props) => {
  const { close } = props;

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <div className='relative flex gap-4'>
          <div>
            <p className='text-4.25 font-semibold text-black1'>Update Email Address</p>
            <p className='text-sm font-normal mt-1'>This will change the email address associated with your account.</p>
          </div>
        </div>
      </Dialog.Header>
      <Dialog.Body className='pt-6.25'>
        <Input placeholder='New Email Address' />
        <Input className='mt-5' placeholder='Confirm New Email Address' />
      </Dialog.Body>
      <Dialog.Footer className='mt-12.5'>
        <Button className='w-full' color='primary'>
          Submit
        </Button>
        <div className='mt-2.5 text-center'>
          <Link className=' text-primary underline'>Cancel</Link>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default UpdateEmailAdminModal;
