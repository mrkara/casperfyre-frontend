import React from 'react';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Input, Button } from 'shared/components/partials';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function VerifyCode() {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {
  }

  return (
    <AuthContainer className="login-page" showInstruction>
      <div className="pb-6">
        <h3 className="font-semibold">Second Step Verification</h3>
        <p>You’re trying to log in. To make sure your account is secure, we have to verify your identity. We sent a 2fa verification code to your inbox.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <Input placeholder="Enter Verification Code" {...register('code')} />
        <Button type="submit" className="w-full">Verify</Button>
      </form>
      <div className="flex pt-4">
        <Link className="text-primary ml-auto" to="/auth/sign-up">Resend Code</Link>
      </div>
    </AuthContainer>
  );
}

export default VerifyCode;
