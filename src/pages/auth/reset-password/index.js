import React from 'react';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Input, Button } from 'shared/components/partials';
import { useForm } from 'react-hook-form';

function ResetPassword() {
  const { handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {
  }

  return (
    <AuthContainer className="login-page" showInstruction>
      <div className="pb-6">
        <h3 className="font-semibold">Set New Password</h3>
        <p>for [user email address]</p>
        <ul className="pt-5">
          <li><span>Min 8 characters</span></li>
          <li><span>1 Letter</span></li>
          <li><span>1 Number</span></li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <Input type="password" placeholder="* Set Password" />
        <Input type="password" placeholder="* Confirm Password" />
        <Button type="submit" className="w-full">Set New Password</Button>
      </form>
    </AuthContainer>
  );
}

export default ResetPassword;
