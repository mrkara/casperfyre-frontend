import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { login, sendLoginMail } from 'stores/auth/actions';
import * as yup from 'yup';

function Login() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  });
  const { setLoading } = useLoading();

  const schema = yup
    .object()
    .shape({
      step: yup.number(),
      email: yup.string().matches(PATTERN.EMAIL, 'Email address is invalid').required(),
      password: yup.string().when('step', {
        is: (st) => st === 2,
        then: yup
          .string()
          .required(),
        otherwise: yup.string().notRequired(),
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      step: 1,
    },
  });

  const step = watch('step');

  const dispatch = useDispatch();

  const onSubmitEmail = (data) => {
    const { email } = data;
    setLoading(true);
    dispatch(
      sendLoginMail(
        email,
        (res) => {
          setLoading(false);
          setUser({
            ...user,
            firstName: res.first_name,
            lastName: res.last_name,
          });
          setValue('step', 2);
        },
        () => {
          setLoading(false);
          setError('email', { type: 'custom', message: 'Email is not found' });
        }
      )
    );
  };

  const onSubmitLogin = (data) => {
    const { email, password } = data;
    setLoading(true);
    dispatch(
      login(
        { email, password },
        (res) => {
          setLoading(false);
          console.log('res: ', res);
        },
        (err) => {
          setLoading(false);
          console.log('error :', err);
        }
      )
    );
  };

  const goBack = () => {
    setValue('step', 1);
  };

  return (
    <AuthContainer className='login-page' showInstruction>
      {step === 1 && (
        <>
          <h3 className='pb-6 font-semibold'>Login</h3>
          <form onSubmit={handleSubmit(onSubmitEmail)} className='flex flex-col space-y-5'>
            <Input placeholder='Email Address' {...register('email')} error={errors && errors?.email?.message} />
            <Button type='submit' className='w-full' disabled={!isValid}>
              Next
            </Button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className='capitalize pb-6 font-semibold'>
            Hello, {user.firstName} {user.lastName}
          </h3>
          <form onSubmit={handleSubmit(onSubmitLogin)} className='flex flex-col space-y-5'>
            <Input
              type='password'
              placeholder='Password'
              {...register('password')}
              error={errors && errors?.password?.message}
            />
            <Button type='submit' className='w-full' disabled={!isValid}>
              Next
            </Button>
          </form>
        </>
      )}
      <div className='flex pt-4'>
        {step === 2 && (
          <button className='text-primary' onClick={goBack}>
            Back
          </button>
        )}
        <p className='ml-auto'>
          Don’t have an account?{' '}
          <Link className='text-primary' to='/auth/signup'>
            Sign Up
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
}

export default Login;
