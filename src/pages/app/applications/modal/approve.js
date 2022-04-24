import React from 'react';
import { ReactComponent as Check } from 'assets/icons/check.svg';
import { useDispatch } from 'react-redux';
import { useLoading } from 'shared/components/modules/Loading';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { approveUser } from 'stores/app/actions';
import { toast } from 'react-toastify';

const ApproveModal = (props) => {
  const { close, application, onApprove } = props;

  const { guid, email } = application;

  const { setLoading } = useLoading();
  const dispatch = useDispatch();

  const handleApprove = () => {
    setLoading(true);
    dispatch(
      approveUser(
        { guid },
        () => {
          setLoading(false);
          onApprove && onApprove(guid);
          close();
          toast.success(`You approved ${email}`);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const handleCancel = () => {
    close();
  };
  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <div className='relative flex gap-4'>
          <Check className='absolute mt-1 -left-8' />
          <div>
            <p className='text-base font-semibold text-black1'>Grant this user an API Key</p>
            <p className='text-sm font-normal mt-1'>Confirm that you want to grant this user and API key.</p>
          </div>
        </div>
      </Dialog.Header>
      <Dialog.Body></Dialog.Body>
      <Dialog.Footer className=''>
        <Button className='w-full mt-6' color='success' onClick={handleApprove}>
          Approve API Key
        </Button>
        <Button className='w-full mt-5' color='primary' onClick={handleCancel}>
          Cancel
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ApproveModal;
