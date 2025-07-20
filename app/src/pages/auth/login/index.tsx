import React, { useState } from 'react';
import {
  EmailPasswordInputInterface,
  KeyPairInterface,
  SuccessMessageInterface,
} from '@src/redux/interfaces';
import type { GlobalInputFieldType } from '@src/components/input/GlobalInput';
import { AuthFormInput } from '@src/components/Auth/AuthFormInput';
import { useRouter } from 'next/router';
import { APP_ROUTE } from '@src/constants';
import { GetServerSideProps } from 'next';
import PublicLayout from '@src/components/layout/public_layout/PublicLayout';

// Default values for the authentication state
const defaultValue: EmailPasswordInputInterface = {
  email: '',
  password: '',
};

// Field definitions for the authentication form
const AuthFields: GlobalInputFieldType[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    dataType: 'email',
    maxLength: 80,
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    dataType: 'password',
    minLength: 8,
    maxLength: 20,
    required: true,
  },
];

// Component for resetting password
export default function Login() {
  const [loginState, setLoginState] = useState<EmailPasswordInputInterface | KeyPairInterface>(
    defaultValue,
  ); // State to store form input values

  const router = useRouter(); // Next.js router instance
  const handleSubmit = () => {
    // Redirect to the dashboard after successful login
    router.push(APP_ROUTE.HOME);
  };
  return (
    <>
      <h4>Welcome Back!</h4>
      <p>Please enter the detail below to continue the login process</p>

      {/* Authentication form component */}
      <AuthFormInput
        state={loginState}
        setState={setLoginState}
        fields={AuthFields}
        onSubmit={() => handleSubmit()}
        buttonTitle={'Login'}
        signUpLink
        forgotPasswordLink
        rememberMe
      />
    </>
  );
}

Login.layout = PublicLayout;
