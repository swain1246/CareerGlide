import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  college: yup.string().required('College is required'),
  degree: yup.string().required('Degree is required'),
  registrationNumber: yup.string().required('Registration Number is required'),
  yearOfPassing: yup.number().typeError('Must be a number').required('Year of Passing is required'),
});

export const otpValidationSchema = yup.object().shape({
  OTP: yup
    .string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});
