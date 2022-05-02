import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { replaceKey } from 'stores/api/admin/actions';

const ReplaceKeyModal = (props) => {
  const { close, guid } = props;

  const dispatch = useDispatch();

  const handleCancel = () => {
    close();
  };

  const handleReplaceKey = () => {
    dispatch(
      replaceKey({ guid }, (res) => {
        console.log(res);
        close();
      })
    );
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Replace Key'
        subTitle='This action will replace your existing key with a new one. Please confirm or cancel this action. This
              action can not be undone.'
      />
      <Dialog.Footer>
        <Button className='w-full mt-6' color='primary' onClick={handleReplaceKey}>
          Replace Key
        </Button>
        <div className='mt-2.5 text-center'>
          <Button variant='text' className='underline' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ReplaceKeyModal;
