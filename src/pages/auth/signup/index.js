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
        <h3 className="font-semibold">Sign Up</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <Input placeholder="* Email Address" {...register('email')} />
        <Input placeholder="* Confirm Email Address" />
        <Input type="password" placeholder="* Set Password" />
        <Input type="password" placeholder="* Confirm Password" />
        <Input placeholder="Company Name / Project Name" />
        <Input placeholder="Please tell us, what you will use your CSPR for?" />
        <Input placeholder="How many CSPR do you expect to use per month?" />
        <Button type="submit" className="w-full">Verify</Button>
      </form>
      <div className="flex pt-4">
        <p className="ml-auto">Already have an account?<Link className="text-primary" to="/auth/login"> Log in</Link></p>
      </div>
    </AuthContainer>
  );
}

export default VerifyCode;
