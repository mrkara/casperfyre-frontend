import React from 'react';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const VerifyAdminModal = ({ close, type = 'email' }) => {
  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Second Step Verification'
        subTitle={
          type === 'email'
            ? `To complete this change, we have to verify your identity. We sent a 2fa verification code to your NEW email address.`
            : `To change this setting we must verify your identity. To make sure your account is secure, we sent a 2fa
              verification code to your inbox.`
        }
      />
      <Dialog.Body className='pt-6.25'>
        <Input placeholder='Enter Verification Code' />
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button className='w-full' color='primary'>
          {type === 'email' ? `Complete Email Change` : `Verify`}
        </Button>
        <p className='text-right pt-4 text-primary'>Resend Code</p>
      </Dialog.Footer>
    </Dialog>
  );
};

export default VerifyAdminModal;
