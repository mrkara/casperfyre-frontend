import React from 'react';
import { Button, Input } from 'shared/components/partials';
import { Dialog, useDialog } from 'shared/components/partials/Dialog/Provider';
import VerifyAdminModal from 'shared/components/modules/Modals/Verify';

const UpdatePasswordAdminModal = (props) => {
  const { close } = props;

  const { appendDialog, closeCurrentDialog } = useDialog();

  const handleCancel = () => {
    close();
  };

  const handleSubmit = () => {
    closeCurrentDialog();
    appendDialog(<VerifyAdminModal type='password' />);
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='Update Password' subTitle='This will change the password associated with your account.' />
      <Dialog.Body className='pt-6.25'>
        <Input placeholder='New Password' />
        <Input className='mt-5' placeholder='Confirm New password' />
      </Dialog.Body>
      <Dialog.Footer className='mt-12.5'>
        <Button className='w-full' color='primary' onClick={handleSubmit}>
          Complete Password Change
        </Button>
        <div className='mt-2.5 text-center'>
          <Button variant='text' className=' text-primary underline' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default UpdatePasswordAdminModal;
