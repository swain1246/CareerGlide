export type studentRegisterFormValuesType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  college: string;
  degree: string;
  registrationNumber: string;
  yearOfPassing: number;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
};

export type OTPValuesType = {
  email?: string;
  OTP: string;
};
