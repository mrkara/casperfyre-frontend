import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { signUp } from 'stores/auth/actions';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup.string().required().matches(PATTERN.EMAIL, 'Email address is invalid'),
    confirm_email: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Email must match')
      .required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    password: yup
      .string()
      .matches(
        PATTERN.PASSWORD,
        'Please use a password with at least 8 characters including at least one number, one letter and one symbol'
      )
      .required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password must match')
      .required(),
    company: yup.string(),
    description: yup.string(),
    cspr_expectation: yup.string(),
  })
  .required();

const Thanks = (props) => {
  return (
    <AuthContainer className="login-page" showInstruction>
      <div className="pb-6">
        <h3 className="capitalize font-semibold">Thanks {props.user?.first_name} {props.user?.last_name}!</h3>
        <p>Your application for the Casper Fyre will be reviewed by one of our admins! If accepted, you will receive an email explaining next steps.</p>
      </div>
      <Button className="w-full" as={Link} to="/auth/login">Go to Login</Button>
    </AuthContainer>
  );
}

const SignUpForm = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { setLoading } = useLoading();


  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(signUp(data, () => {
      setLoading(false);
      if (props.setUser) props.setUser(data);
    }, () => {
      setLoading(false);
    }));
  };

  return (
    <AuthContainer className='signup-page' showInstruction>
      <div className='h-full flex flex-col'>
        <div className='pb-3'>
          <h3 className='font-semibold'>Sign Up</h3>
        </div>
        <div className='-mx-12 flex-1 min-h-0 overflow-y-scroll'>
          <div className='px-12'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
              <Input
                placeholder='* Email Address'
                name='email'
                {...register('email')}
                error={errors && errors?.email?.message}
              />
              <Input
                placeholder='* Confirm Email Address'
                name='confirm_email'
                {...register('confirm_email')}
                error={errors && errors?.confirm_email?.message}
              />
              <Input
                placeholder='* First Name'
                name='first_name'
                {...register('first_name')}
                error={errors && errors?.first_name?.message}
              />
              <Input
                placeholder='* Last Name'
                name='last_name'
                {...register('last_name')}
                error={errors && errors?.last_name?.message}
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
                name='confirm_password'
                {...register('confirm_password')}
                error={errors && errors?.confirm_password?.message}
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
              <Button type="submit" className='w-full' disabled={!isValid}>Submit</Button>
            </form>
            <div className='flex pt-4'>
              <p className='ml-auto'>
                Already have an account?
                <Link className='text-primary pl-1' to='/auth/login'>
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}

const SignUp = () => {
  const [user, setUser] = useState(null);
  return (
    !user ? <SignUpForm setUser={setUser} /> : <Thanks user={user} />
  )
};

export default SignUp;
