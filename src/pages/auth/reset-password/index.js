import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as Checkmark } from 'assets/icons/checkmark.svg';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Button, Input } from 'shared/components/partials';
import { resetPassword } from 'stores/auth/actions';
import { PATTERN } from 'shared/common/pattern';
import * as yup from 'yup';
import style from './style.module.scss';

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .matches(
        PATTERN.PASSWORD,
        ''
      )
      .required(),
    new_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password must match')
      .required(),
  })
  .required();

function ResetPassword() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      new_password: ''
    }
  });

  const watchPassword = watch('password');

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(
      resetPassword({ ...data, hash: params.hash }, () => {
        history.push('/auth/login');
      })
    );
  };

  const checkValidMin = () => {
    return watchPassword?.length >= 8;
  };

  const checkValidLetter = () => {
    return PATTERN.PASSWORD_LETTER.test(watchPassword);
  };

  const checkValidNumber= () => {
    return PATTERN.PASSWORD_NUMBER.test(watchPassword);
  };

  return (
    <AuthContainer className='login-page' showInstruction>
      <div className='pb-6'>
        <h3 className='font-semibold'>Set New Password</h3>
        <p>for [user email address]</p>
        <ul className='pt-5 flex flex-col gap-y-3'>
          <li className={`flex items-center gap-x-3 ${checkValidMin() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>Min 8 characters</p>
          </li>
          <li className={`flex items-center gap-x-3 ${checkValidLetter() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>1 Letter</p>
          </li>
          <li className={`flex items-center gap-x-3 ${checkValidNumber() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>1 Number</p>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
        <Input type='password' placeholder='New Password' name='password' {...register('password')} />
        <Input type='password' placeholder='Confirm Password' name='new_password' {...register('new_password')} />
        <Button type='submit' className='w-full' disabled={!isValid}>
          Set New Password
        </Button>
      </form>
    </AuthContainer>
  );
}

export default ResetPassword;
