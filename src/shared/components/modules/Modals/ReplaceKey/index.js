import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const ReplaceKeyModal = (props) => {
  const { close } = props;

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Replace Key'
        subTitle='This action will replace your existing key with a new one. Please confirm or cancel this action. This
              action can not be undone.'
      />
      <Dialog.Footer>
        <Button className='w-full mt-6' color='primary' onClick={handleCancel}>
          Replace Key
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

export default ReplaceKeyModal;
