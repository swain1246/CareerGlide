export interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
  icon?: React.ComponentType<{ className: string }>;
}

export interface KeyPairInterface {
  [key: string]: any;
}

export interface ForgotPasswordInputInterface {
  email: string;
}

export interface OtpInputInterface {
  otp: string;
}

export interface SuccessMessageInterface {
  success: boolean;
  message: string;
}

export interface ResetPasswordInputInterface {
  password: string;
  confirm_password: string;
}

export interface EmailPasswordInputInterface {
  email: string;
  password: string;
}

export interface RegisterInputInterface {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  dob: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}
