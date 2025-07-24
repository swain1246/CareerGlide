import React, { useState, KeyboardEvent } from 'react';
import InputField, { CustomSelectDateEvent } from '@src/components/input/InputField';
import SelectField, { CustomSelectChangeEvent } from '@src/components/input/SelectField';
import type { GlobalInputFieldType } from '@src/components/input/GlobalInput';
import { validateFieldError } from '@src/helper/validations/custom';
import { APP_ROUTE } from '@src/constants';
import { ValidateInputValue } from '@src/helper/common';
import { AuthResendOTP } from './AuthResendOtp';
import { KeyPairInterface, LoginPayload } from '@src/redux/interfaces';
import Link from 'next/link';

type AuthFormInputProps = {
  state: KeyPairInterface;
  setState: React.Dispatch<React.SetStateAction<KeyPairInterface | LoginPayload>>;
  fields: GlobalInputFieldType[];
  onSubmit: () => void;
  onResend?: () => void;
  buttonTitle: string;
  formType?: 'candidate' | 'admin';
  loginLink?: boolean;
  signUpLink?: boolean;
  forgotPasswordLink?: boolean;
  acceptTerms?: boolean;
  rememberMe?: boolean;
};

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
}) => {
  const [error, setError] = useState<KeyPairInterface>({});
  const [accepted, setAccepted] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const handleInputChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement | CustomSelectChangeEvent | CustomSelectDateEvent>,
  ) => {
    const { error, key, value, changable } = ValidateInputValue(e);
    if (changable) {
      setState((prev) => ({ ...prev, [key]: value }));
    }
    setError((prev) => ({ ...prev, [key]: error }));
  };

  const handleKeyDownEvent = (e: KeyboardEvent<HTMLElement | HTMLTextAreaElement>) => {
    if (e.key.toLowerCase() === 'enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const isValid = validate();
    if (isValid) {
      onSubmit();
    }
  };

  const handleAccepted = () => {
    setAccepted(!accepted);
    setError((prev) => ({ ...prev, accepted: '' }));
  };

  const validate = () => {
    let isValid = true;
    fields.forEach((field) => {
      const value: string = state[field.name] ?? '';
      const err = validateFieldError({ ...field, value });
      if (err?.errorMsg) {
        setError((prev) => ({ ...prev, [field.name]: err.errorMsg }));
        isValid = false;
      }
      if (field.name === 'confirm_password') {
        if ((state['password'] ?? '') !== value) {
          setError((prev) => ({
            ...prev,
            confirm_password: 'Confirm Password does not match.',
          }));
          isValid = false;
        }
      }
    });

    if (acceptTerms && !accepted) {
      setError((prev) => ({
        ...prev,
        accepted: 'Please accept the terms of use and privacy policy.',
      }));
      isValid = false;
    }

    return isValid;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md mx-auto space-y-6">
      {/* Form Fields */}
      <div className="space-y-5">
        {fields.map((field, index) => {
          const InputComponent = field.type === 'select' ? SelectField : InputField;
          return (
            <div key={index} className="space-y-1">
              <InputComponent
                placeholder={
                  field.placeholder ??
                  (field.type === 'date' ? field.label : `Enter ${field.label}`)
                }
                value={state[field.name]}
                error={error[field.name]}
                onChangeInput={handleInputChangeEvent}
                onKeyDown={handleKeyDownEvent}
                {...field}
              />
            </div>
          );
        })}
      </div>

      {/* OTP Resend */}
      {onResend && <AuthResendOTP onResend={onResend} />}

      {/* Terms & Conditions */}
      {acceptTerms && (
        <div className="relative flex items-start pt-1">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={accepted}
              onChange={handleAccepted}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I accept the{' '}
              <Link
                href={APP_ROUTE.TERMS_AND_CONDITION}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                terms of use
              </Link>{' '}
              and{' '}
              <Link
                href={APP_ROUTE.PRIVACY_POLICY}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                privacy policy
              </Link>
            </label>
            {error.accepted && <p className="mt-1 text-sm text-red-600">{error.accepted}</p>}
          </div>
        </div>
      )}

      {/* Remember Me */}
      {rememberMe && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          {forgotPasswordLink && (
            <div className="text-sm">
              <Link
                href={APP_ROUTE.FORGOT_PASSWORD}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer"
        >
          {buttonTitle}
        </button>
      </div>

      {/* Footer Links */}
      <div className="text-center text-sm space-y-3 pt-2">
        {loginLink && (
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              href={APP_ROUTE.LOGIN}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        )}

        {signUpLink && (
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <Link
              href={APP_ROUTE.REGISTER}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up Now
            </Link>
          </p>
        )}

        {!rememberMe && forgotPasswordLink && (
          <p className="text-gray-600">
            <Link
              href={APP_ROUTE.FORGOT_PASSWORD}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};
