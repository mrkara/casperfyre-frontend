import React from 'react';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Input, Button } from 'shared/components/partials';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function ForgotPassword() {
  const { handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {
  }

  return (
    <AuthContainer className="login-page" showInstruction>
      <div className="pb-6">
        <h3 className="font-semibold">Reset Password</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <Input placeholder="Email Address" />
        <Button type="submit" className="w-full">Get Reset Email</Button>
      </form>
      <div className="flex pt-4">
        <Link className="text-primary" to="/auth/login">Back</Link>
      </div>
    </AuthContainer>
  );
}

export default ForgotPassword;
