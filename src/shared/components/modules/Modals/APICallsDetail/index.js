import React from 'react';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const APICallsDetailModal = (props) => {
  const { close } = props;

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='API Call Details' />
      <Dialog.Body className='mt-5 flex flex-col gap-y-1'>
        <p>
          Timestamp: <b>2022-03-31 09:37:53</b>
        </p>
        <p>
          IP From: <b>192.292.2.2</b>
        </p>
        <p>
          CSPR Amount: <b>25</b>
        </p>
        <p>
          Recipient: <b>0x24232fdq32435gwefde</b>
        </p>
        <p className='mt-5'>
          Response Code: <b className='text-success'>Delivered</b>
        </p>
        <p>
          TXID: <b>0x080234c6b00b16157822a7dc600097f2594cb961665b3946b9d755c43f9b762e</b>
        </p>
      </Dialog.Body>
      <Dialog.Footer>
        <div className='mt-4'>
          <Button className='w-full' onClick={handleCancel}>
            Close
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default APICallsDetailModal;
