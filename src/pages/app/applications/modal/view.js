import React from 'react';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const ViewModal = (props) => {
  const { close } = props;

  const handleClose = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <p className='text-base font-semibold text-black1'>Reason for CSPR</p>
      </Dialog.Header>
      <Dialog.Body className=''>
        <p className='text-sm font-normal'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nisl augue. Aliquam ultrices ante ac
          mattis dapibus. Nulla non libero nibh. Sed luctus at eros ac volutpat. Quisque id urna quam. Fusce aliquam in
          tortor quis aliquet. Phasellus dictum bibendum lacus ac auctor. Nullam erat odio, dictum id ullamcorper sed,
          consectetur ut dolor..
        </p>
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button className='w-full' onClick={handleClose}>
          Ok
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ViewModal;
