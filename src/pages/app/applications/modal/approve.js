import React from 'react';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const ApproveModal = (props) => {
  const { close } = props;

  const handleCancel = () => {
    close();
  };
  return (
    <Dialog className='p-12' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <p className='text-[17px] font-semibold text-black1'>Grant this user an API Key</p>
        <p className='text-sm font-normal'>Confirm that you want to grant this user and API key.</p>
      </Dialog.Header>
      <Dialog.Body></Dialog.Body>
      <Dialog.Footer className=''>
        <button className='w-full bg-success mt-6 py-3 text-sm font-semibold text-white'>Approve API Key</button>
        <button className='w-full mt-2 bg-danger py-3 text-sm font-semibold text-white' onClick={handleCancel}>
          Cancel
        </button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ApproveModal;
