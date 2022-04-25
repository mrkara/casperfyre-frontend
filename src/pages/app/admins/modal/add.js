import { ReactComponent as Add } from 'assets/icons/add.svg';
import React from 'react';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const AddAdminModal = (props) => {
  const { close } = props;

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <div className='relative flex gap-4'>
          <div>
            <div className='flex gap-1 items-center'>
              <Add className='text-xs' />
              <p className='text-4.25 font-semibold text-black1'>Add New Admin</p>
            </div>
            <p className='text-sm font-normal mt-1'>What is the admin’s email address?</p>
          </div>
        </div>
      </Dialog.Header>
      <Dialog.Body className='pt-6.25'>
        <Input placeholder='Email Address' />
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button className='w-full' color='success'>
          Send Invite
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default AddAdminModal;
