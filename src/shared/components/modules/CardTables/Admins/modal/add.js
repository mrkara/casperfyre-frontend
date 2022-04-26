import { ReactComponent as Add } from 'assets/icons/add.svg';
import React from 'react';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const AddAdminModal = (props) => {
  const { close } = props;

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='Add New Admin' subTitle='What is the admin’s email address?' />
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
