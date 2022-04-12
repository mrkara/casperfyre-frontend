import React, { useState } from 'react';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Input, Button } from 'shared/components/partials';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATTERN } from 'shared/common/pattern';
import { useLoading } from 'shared/components/modules/Loading';
import { useDispatch } from 'react-redux';
import { forgotPassword } from 'stores/auth/actions';
import MailBox from 'assets/images/mail-box.png';

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
          <Button color="text" onClick={props.retry}>
            Click here to resend it.
          </Button>
        </p>
      </div>
    </AuthContainer>
  );
};

const schema = yup
  .object()
  .shape({
    email: yup.string().matches(PATTERN.EMAIL, 'Email address is invalid').required(),
  })
  .required();

const ForgotPasswordForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      step: 1,
    },
  });

  const onSubmit = (data) => {
    props.onSubmit(data);
  };


  return (
    <AuthContainer className="login-page" showInstruction>
      <div className="pb-6">
        <h3 className="font-semibold">Reset Password</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <Input placeholder='Email Address' {...register('email')} error={errors && errors?.email?.message} />
        <Button type="submit" className="w-full" disabled={!isValid}>Get Reset Email</Button>
      </form>
      <div className="flex pt-4">
        <Link className="text-primary" to="/auth/login">Back</Link>
      </div>
    </AuthContainer>
  );
}

const ForgotPasswordPage = () => {
  const [data, setData] = useState(null);
  const { setLoading } = useLoading();
  const dispatch = useDispatch();

  const onSubmit = (temp) => {
    setData(temp, () => {
      retry();
    });
  };

  const retry = () => {
    setLoading(true);
    dispatch(
      forgotPassword(
        data,
        (res) => {
          setLoading(false);
        },
        (err) => {
          setLoading(false);
        }
      )
    );
  }

  return (
    !data ? <ForgotPasswordForm onSubmit={onSubmit} /> : <SendToMail retry={retry} />
  )
}

export default ForgotPasswordPage;
