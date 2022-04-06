import React, { useState } from 'react';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Input, Button } from 'shared/components/partials';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmitStep1 = () => {
    setStep(2);
  }

  const goBack = () => {
    setStep(1);
  }

  return (
    <AuthContainer className="login-page" showInstruction>
      {step === 1 && (
        <>
          <h3 className="pb-6 font-semibold">Login</h3>
          <form onSubmit={handleSubmit(onSubmitStep1)} className="flex flex-col space-y-5">
            <Input placeholder="Email Address" {...register('email')} />
            <Button type="submit" className="w-full">Next</Button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className="pb-6 font-semibold">Hello, [User First Name]</h3>
          <form className="flex flex-col space-y-5">
            <Input type="password" placeholder="Password" {...register('password')} />
            <Button type="submit" className="w-full">Next</Button>
          </form>
        </>
      )}
      <div className="flex pt-4">
        {step === 2 && <button className="text-primary" onClick={goBack}>Back</button>}
        <p className="ml-auto">Don’t have an account? <Link className="text-primary" to="/auth/signup">Sign Up</Link></p>
      </div>
    </AuthContainer>
  );
}

export default Login;
