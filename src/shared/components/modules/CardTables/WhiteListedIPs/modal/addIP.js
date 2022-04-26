import { ReactComponent as Add } from 'assets/icons/add.svg';
import React from 'react';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const AddIPModal = (props) => {
  const { close } = props;

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <div className='relative flex gap-4'>
          <div>
            <p className='text-4.25 font-semibold text-black1'>Add New IP</p>
            <p className='text-sm font-normal mt-1'>Enter the IP you wish to whitelist.</p>
          </div>
        </div>
      </Dialog.Header>
      <Dialog.Body className='pt-6.25'>
        <Input placeholder='IP address' />
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button className='w-full' color='success'>
          <Add className='mr-2 text-xs' />
          Whitelist this IP
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default AddIPModal;
