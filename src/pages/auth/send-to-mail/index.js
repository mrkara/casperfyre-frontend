import MailBox from 'assets/images/mail-box.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContainer } from 'shared/components/modules/AuthContainer';

const SendToMail = (props) => {
  return (
    <AuthContainer className='login-page' showInstruction>
      <div className='flex flex-col items-center justify-center'>
        <img src={MailBox} alt='Mail box' />
        <h3 className='font-boild my-2'>Check your inbox</h3>
        <Link className='text-primary' to='/auth/login'>
          Back to Log In
        </Link>
        <p className='mt-5'>
          Don’t get email?{' '}
          <Link className='text-primary' to='/auth/signup'>
            Click here to resend it.
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default SendToMail;
