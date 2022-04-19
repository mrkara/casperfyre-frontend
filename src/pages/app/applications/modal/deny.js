import React from 'react';
import { Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const DenyModal = (props) => {
  const { close } = props;

  const handleDeny = () => {
    close();
  };

  return (
    <Dialog className='p-12' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <div className='flex gap-4'>
          <p>x</p>
          <div>
            <p className='text-[17px] font-semibold text-black1'>Deny this user an API Key</p>
            <p className='text-sm font-normal'>Enter your reason below.</p>
          </div>
        </div>
      </Dialog.Header>
      <Dialog.Body className='mt-6'>
        <Input rows={4} placeholder='Enter reason....' />
      </Dialog.Body>
      <Dialog.Footer className='mt-2'>
        <button className='w-full bg-danger py-3 text-sm font-semibold text-white' onClick={handleDeny}>
          Deny this user
        </button>
        <p className='text-sm mt-3 text-primary cursor-pointer'>Back</p>
      </Dialog.Footer>
    </Dialog>
  );
};

export default DenyModal;
