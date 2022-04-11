import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Button, Input } from 'shared/components/partials';
import { signUp } from 'stores/auth/actions';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup.string().required().matches(PATTERN.EMAIL, 'Email address is invalid'),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Email must match')
      .required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup
      .string()
      .matches(
        PATTERN.PASSWORD,
        'Please use a password with at least 8 characters including at least one number, one letter and one symbol'
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password must match')
      .required(),
    company: yup.string(),
    description: yup.string(),
    cspr_expectation: yup.string(),
  })
  .required();

function VerifyCode() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signUp(data));
  };

  return (
    <AuthContainer className='login-page' showInstruction>
      <div className='pb-6'>
        <h3 className='font-semibold'>Sign Up</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
        <Input
          placeholder='* Email Address'
          name='email'
          {...register('email')}
          error={errors && errors?.email?.message}
        />
        <Input
          placeholder='* Confirm Email Address'
          name='confirmEmail'
          {...register('confirmEmail')}
          error={errors && errors?.confirmEmail?.message}
        />
        <Input
          placeholder='* First Name'
          name='firstName'
          {...register('firstName')}
          error={errors && errors?.firstName?.message}
        />
        <Input
          placeholder='* Last Name'
          name='lastName'
          {...register('lastName')}
          error={errors && errors?.lastName?.message}
        />
        <Input
          type='password'
          placeholder='* Set Password'
          name='password'
          {...register('password')}
          error={errors && errors?.password?.message}
        />
        <Input
          type='password'
          placeholder='* Confirm Password'
          name='confirmPassword'
          {...register('confirmPassword')}
          error={errors && errors?.confirmPassword?.message}
        />
        <Input
          placeholder='Company Name / Project Name'
          name='company'
          {...register('company')}
          error={errors && errors?.company?.message}
        />
        <Input
          placeholder='Please tell us, what you will use your CSPR for?'
          rows={5}
          name='description'
          {...register('description')}
          error={errors && errors?.description?.message}
        />
        <Input
          placeholder='How many CSPR do you expect to use per month?'
          name='cspr_expectation'
          {...register('cspr_expectation')}
          error={errors && errors?.cspr_expectation?.message}
        />
        <Button className='w-full'>Verify</Button>
      </form>
      <div className='flex pt-4'>
        <p className='ml-auto'>
          Already have an account?
          <Link className='text-primary' to='/auth/login'>
            Log in
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
}

export default VerifyCode;
