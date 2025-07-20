import React, { useState, useEffect } from 'react';

/**
 * Props for AuthResendOTP component
 */
type AuthResendOTPProps = {
  /**
   * Function to handle OTP resend
   */
  onResend: Function;
};

/**
 * AuthResendOTP component for handling OTP resend functionality
 */
export const AuthResendOTP: React.FC<AuthResendOTPProps> = ({ onResend }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Start the timer when component mounts
    if (seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    // Clear the timer when component unmounts or when seconds reach 0
    return () => {
      clearInterval(timerId);
    };
  }, [seconds]);

  /**
   * Function to handle OTP resend
   */
  const handleResend = async () => {
    if (seconds === 0) {
      const resend = await onResend();
      if (resend) {
        setSeconds(60);
      }
    }
  };

  return (
    <>
      <div className="resend-otp-div">
        <div>
          {seconds > 0 && (
            <>
              Time Remaining: <strong>{seconds} seconds</strong>
            </>
          )}
        </div>

        <div>
          <span onClick={handleResend} className={seconds > 0 ? 'disabled' : ''}>
            Resend Otp
          </span>
        </div>
      </div>
    </>
  );
};
