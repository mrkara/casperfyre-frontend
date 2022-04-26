import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const StatusKeyModal = (props) => {
  const { close, disabled = false } = props;

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Success!'
        subTitle={`You have ${disabled ? 'disabled' : `re-activated`} [user email address].`}
      />
      <Dialog.Footer>
        <Button className='w-full mt-6' color={disabled ? 'primary' : 'success'} onClick={handleCancel}>
          Close
        </Button>
        <div className='mt-24 text-center'>
          <Link
            className={classNames('text-primary underline', {
              'text-success': disabled,
            })}
            onClick={handleCancel}
          >
            {disabled ? 'Re-activate this user' : 'Disable this user'}
          </Link>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default StatusKeyModal;
