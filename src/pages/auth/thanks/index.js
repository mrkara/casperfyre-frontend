import React from 'react';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { Button } from 'shared/components/partials';
import { Link } from 'react-router-dom';

function Thanks() {
  return (
    <AuthContainer className="login-page" showInstruction>
      <div className="pb-6">
        <h3 className="font-semibold">Thanks [User first name]!</h3>
        <p>Your application for the Casper Fyre will be reviewed by one of our admins! If accepted, you will receive an email explaining next steps.</p>
      </div>
      <Button className="w-full" as={Link} to="/auth/login">Go to Login</Button>
    </AuthContainer>
  );
}

export default Thanks;
