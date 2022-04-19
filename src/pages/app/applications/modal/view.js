import React from 'react';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const ViewModal = (props) => {
  const { close } = props;

  const handleClose = () => {
    close();
  };

  return (
    <Dialog className='p-12' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <p className='text-[17px] font-semibold text-black1'>Reason for CSPR</p>
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
        <button className='w-full bg-danger py-3 text-sm font-semibold text-white' onClick={handleClose}>
          Ok
        </button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ViewModal;
