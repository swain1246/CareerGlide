import React, { useState, useEffect } from 'react';

type AuthResendOTPProps = {
  onResend: Function;
};

export const AuthResendOTP: React.FC<AuthResendOTPProps> = ({ onResend }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [seconds]);

  const handleResend = async () => {
    if (seconds === 0) {
      const success = await onResend();
      if (success) {
        setSeconds(60); // restart timer
      }
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center space-y-2 text-sm text-gray-700">
      {seconds > 0 ? (
        <div>
          ⏳ Time Remaining: <span className="font-semibold">{seconds}s</span>
        </div>
      ) : (
        <div className="h-5" /> // maintain spacing
      )}

      <button
        onClick={handleResend}
        disabled={seconds > 0}
        className={`px-4 py-1 rounded border 
          ${
            seconds > 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } 
        transition duration-200`}
      >
        Resend OTP
      </button>
    </div>
  );
};
