import { FormField } from '@src/components/input/FormBuilder';

export const loginFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
];

export const studentRegistrationFields: FormField[] = [
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email' },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your last name',
  },
  { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    required: true,
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    name: 'college',
    label: 'College',
    type: 'text',
    required: true,
    placeholder: 'Enter your college',
  },
  {
    name: 'degree',
    label: 'Degree',
    type: 'text',
    required: true,
    placeholder: 'Enter your degree',
  },
  {
    name: 'registrationNumber',
    label: 'Registration Number',
    type: 'text',
    required: true,
    placeholder: 'Enter reg. no.',
  },
  {
    name: 'yearOfPassing',
    label: 'Year of Passing',
    type: 'number',
    required: true,
    placeholder: 'e.g., 2023',
  },
];

export const mentorRegistrationFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your last name',
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    required: true,
    placeholder: 'Enter your contact number',
  },
  {
    name: 'designation',
    label: 'Designation',
    type: 'text',
    required: true,
    placeholder: 'Enter your designation',
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your company name',
  },
  {
    name: 'experienceYears',
    label: 'Years of Experience',
    type: 'number',
    required: true,
    placeholder: 'Enter total experience in years',
  },
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    required: true,
    placeholder: 'Write a short bio about yourself',
  },
];

export const companyRegistrationFields: FormField[] = [
  {
    name: 'loginEmail',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your company name',
  },
  {
    name: 'contactPersonName',
    label: 'Contact Person Name',
    type: 'text',
    required: true,
    placeholder: 'Enter contact person name',
  },
  {
    name: 'contactPersionDesignation',
    label: 'Contact Person Designation',
    type: 'text',
    required: true,
    placeholder: 'Enter designation',
  },
  {
    name: 'supportEmail',
    label: 'Support Email',
    type: 'text',
    required: true,
    placeholder: 'Enter support email',
  },
  {
    name: 'phoneNumber',
    label: 'Contact Number',
    type: 'number',
    required: true,
    placeholder: 'Enter contact number',
  },
  {
    name: 'gstIn',
    label: 'GST IN',
    type: 'number',
    required: true,
    placeholder: 'Enter GST IN',
  },
  {
    name: 'panNumber',
    label: 'Pan Card Number',
    type: 'number',
    required: true,
    placeholder: 'Enter PAN number',
  },
  {
    name: 'website',
    label: 'Company Website',
    type: 'text',
    required: true,
    placeholder: 'Enter company website URL',
  },
  {
    name: 'industry',
    label: 'Industry',
    type: 'text',
    required: true,
    placeholder: 'Enter industry type',
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
    required: true,
    placeholder: 'Enter company location',
  },
  {
    name: 'linkedinUrl',
    label: 'Linkedin URL',
    type: 'text',
    required: true,
    placeholder: 'Enter Linkedin profile URL',
  },
];

export const otpVerifyFields: FormField[] = [
  {
    name: 'OTP',
    label: 'OTP',
    type: 'text',
    required: true,
    placeholder: 'Enter OTP',
  },
];
