import React from 'react';
import { useDispatch } from 'react-redux';
import { useLoading } from 'shared/components/modules/Loading';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { approveUser } from 'stores/app/actions';

const ApproveModal = (props) => {
  const { close, guid } = props;
  const { setLoading } = useLoading();
  const dispatch = useDispatch();

  const handleApprove = () => {
    setLoading(true);
    dispatch(
      approveUser({ guid }, () => {
        setLoading(false);
        close();
      }, () => {
        setLoading(false);
      })
    );
  };

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
        <Button className='w-full mt-6' color="success" onClick={handleApprove}>
          Approve API Key
        </Button>
        <Button className='w-full mt-2' color="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ApproveModal;
