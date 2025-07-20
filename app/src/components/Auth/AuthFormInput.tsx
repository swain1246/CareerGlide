import React, { useState } from 'react';
import InputField, { CustomSelectDateEvent } from '@src/components/input/InputField';
import SelectField, { CustomSelectChangeEvent } from '@src/components/input/SelectField';
import type { GlobalInputFieldType } from '@src/components/input/GlobalInput';
import { Form } from 'antd';
import { Button } from 'react-bootstrap';
import { validateFieldError } from '@src/helper/validations/custom';
import Link from 'next/link';
import { APP_ROUTE } from '@src/constants';
import { ValidateInputValue } from '@src/helper/common';
import { AuthResendOTP } from './AuthResendOtp';
import { KeyPairInterface } from '@src/redux/interfaces';

/**
 * Props for AuthFormInput component
 */
type AuthFormInputProps = {
  state: KeyPairInterface; // State containing input field values
  setState: React.Dispatch<React.SetStateAction<KeyPairInterface>>; // Function to update state
  fields: GlobalInputFieldType[]; // Input fields configuration
  onSubmit: () => void; // Function to handle form submission
  onResend?: () => void; // Function to resend OTP
  buttonTitle: string; // Title for the submit button
  formType?: 'candidate' | 'admin'; // Title for the submit button
  loginLink?: boolean; // Whether to show the login link
  signUpLink?: boolean; // Whether to show the sign up link
  forgotPasswordLink?: boolean; // Whether to show the forgot password link
  acceptTerms?: boolean; // Whether to show the terms acceptance checkbox
  rememberMe?: boolean; // Whether to show the remember me checkbox
};

/**
 * AuthFormInput component for rendering authentication form
 */
export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  setState,
  fields,
  state,
  onSubmit,
  onResend,
  buttonTitle,
  loginLink = false,
  signUpLink = false,
  forgotPasswordLink = false,
  acceptTerms = false,
  rememberMe = false,
  formType = 'admin',
}) => {
  const [error, setError] = useState<KeyPairInterface>({});
  const [accepted, setAccepted] = useState<boolean>(false);

  // Function to handle input change event
  const handleInputChangeEvent = async (
    e: React.ChangeEvent<HTMLInputElement | CustomSelectChangeEvent | CustomSelectDateEvent>,
  ) => {
    const { error, key, value, changable } = ValidateInputValue(e);
    if (changable) {
      setState((prev: KeyPairInterface) => ({ ...prev, [key]: value }));
    }
    setError((prev: KeyPairInterface) => ({ ...prev, [key]: error }));
  };

  // Function to handle key down event
  const handleKeyDownEvent = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    const isValid = validate();
    if (isValid) {
      onSubmit();
    }
  };

  // Function to handle terms acceptance
  const handleAccepted = () => {
    setAccepted(!accepted);
    setError((prev: KeyPairInterface) => ({ ...prev, accepted: '' }));
  };

  // Function to validate form fields
  const validate = () => {
    let isValid = true;
    fields.forEach((field: GlobalInputFieldType) => {
      const value: string = state[field.name] ?? '';
      const error = validateFieldError({ ...field, value });
      if (error) {
        setError((prev) => ({ ...prev, [field.name]: error.errorMsg }));
        if (error.errorMsg.length) {
          isValid = false;
        }
      }
      if (field.name === 'confirm_password') {
        const password: string = state['password'] ?? '';
        if (password !== value) {
          setError((prev) => ({
            ...prev,
            [field.name]: 'Confirm Password does not match.',
          }));
          isValid = false;
        }
      }
      if (acceptTerms) {
        if (!accepted) {
          setError((prev) => ({
            ...prev,
            accepted: 'Please accept the terms of use and privacy policy.',
          }));
          isValid = false;
        }
      }
    });
    return isValid;
  };

  return (
    <>
      <Form>
        {fields.map((field: GlobalInputFieldType, index: number) => {
          const InputComponent = field.type == 'select' ? SelectField : InputField;
          return (
            <InputComponent
              key={index}
              placeholder={
                field.placeholder ?? (field.type == 'date' ? field.label : `Enter ${field.label}`)
              }
              value={state[field.name]}
              error={error[field.name]}
              onChangeInput={handleInputChangeEvent}
              onKeyDown={handleKeyDownEvent}
              {...field}
            />
          );
        })}

        {onResend && <AuthResendOTP onResend={onResend} />}

        {acceptTerms && (
          <div className="mb-3 group-relative">
            <div className="same-line-privacy">
              <input type="checkbox" id="accept" checked={accepted} onChange={handleAccepted} />
              <label htmlFor="accept" className="ml-1">
                I accept the{' '}
                <a href={APP_ROUTE.TERMS_AND_CONDITION} target="_blank">
                  terms of use
                </a>{' '}
                and the{' '}
                <a href={APP_ROUTE.PRIVACY_POLICY} target="_blank">
                  privacy policy
                </a>
                .
              </label>
            </div>
            {error.accepted && <p style={{ color: 'red' }}>{error.accepted}</p>}
          </div>
        )}

        {rememberMe && (
          <div className="mb-3 group-relative">
            <div className="same-line-privacy">
              <input type="checkbox" id="remeberMe" />
              <label htmlFor="remeberMe" className="ml-1">
                Remember Me
              </label>
            </div>
          </div>
        )}

        <Button className="btn btn-theme" onClick={handleSubmit}>
          {buttonTitle}
        </Button>
      </Form>

      {loginLink && (
        <div className="bottom-text">
          <span>
            Already have an account? <Link href={APP_ROUTE.LOGIN}>Sign In</Link>
          </span>
        </div>
      )}
      {signUpLink && (
        <div className="bottom-text">
          <span>
            Dont have an account? <Link href={APP_ROUTE.REGISTER}>Sign Up Now</Link>
          </span>
        </div>
      )}
      {forgotPasswordLink && (
        <div className="bottom-text">
          <span>
            <Link href={APP_ROUTE.FORGOT_PASSWORD}>Forgot password?</Link>
          </span>
        </div>
      )}
    </>
  );
};
