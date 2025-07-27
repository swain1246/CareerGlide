import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import authApis from '@src/apis/authApis';
import flashMessage from '@src/components/FlashMessage';
import { useRouter } from 'next/router';
import { APP_ROUTE } from '@src/constants';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'date';
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

// Field definitions
const studentRegistrationFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
    minLength: 8,
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
    type: 'text',
    required: true,
    placeholder: 'e.g., 2023',
  },
];

const mentorRegistrationFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
    minLength: 8,
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
    pattern: '^[0-9]{10}$',
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
    minLength: 0,
  },
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    required: true,
    placeholder: 'Write a short bio about yourself',
    minLength: 20,
  },
];

const companyRegistrationFields: FormField[] = [
  {
    name: 'loginEmail',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
    minLength: 8,
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
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
  {
    name: 'phoneNumber',
    label: 'Contact Number',
    type: 'number',
    required: true,
    placeholder: 'Enter contact number',
    pattern: '^[0-9]{10}$',
  },
  {
    name: 'gstIn',
    label: 'GST IN',
    type: 'text',
    required: true,
    placeholder: 'Enter GST IN',
    pattern: '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$',
  },
  {
    name: 'panNumber',
    label: 'Pan Card Number',
    type: 'text',
    required: true,
    placeholder: 'Enter PAN number',
    pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
  },
  {
    name: 'website',
    label: 'Company Website',
    type: 'text',
    required: true,
    placeholder: 'Enter company website URL',
    pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
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
    pattern: '^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.*$',
  },
];

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'student' | 'company' | 'mentor'>('student');
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let initialData: Record<string, any> = {};

    const fields = getFields();
    fields.forEach((field) => {
      initialData[field.name] = '';
    });

    initialData.confirmPassword = '';

    setFormData(initialData);
    setShowPassword({});
    setErrors({});
  }, [userType]);

  const getFields = (): FormField[] => {
    switch (userType) {
      case 'student':
        return studentRegistrationFields;
      case 'mentor':
        return mentorRegistrationFields;
      case 'company':
        return companyRegistrationFields;
      default:
        return [];
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const userTypeConfig = {
    student: {
      title: 'Join as Student',
      description: 'Start your career journey with access to internships and mentors',
      color: 'bg-blue-600 text-white',
      icon: '🎓',
    },
    company: {
      title: 'Join as Company',
      description: 'Find talented students and post internship opportunities',
      color: 'bg-purple-600 text-white',
      icon: '🏢',
    },
    mentor: {
      title: 'Join as Mentor',
      description: 'Share your expertise and guide the next generation',
      color: 'bg-green-600 text-white',
      icon: '👨‍🏫',
    },
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields = getFields();

    // Validate all fields
    fields.forEach((field) => {
      const value = formData[field.name] || '';

      // Required field validation
      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Pattern validation
      if (field.pattern && value) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(value)) {
          newErrors[field.name] = `Invalid ${field.label.toLowerCase()} format`;
        }
      }

      // Min length validation
      if (field.minLength && value.length < field.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      }

      // Max length validation
      if (field.maxLength && value.length > field.maxLength) {
        newErrors[field.name] = `${field.label} must be at most ${field.maxLength} characters`;
      }

      // Min value validation
      if (field.minLength !== undefined && Number(value) < field.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.minLength}`;
      }

      // Max value validation
      if (field.maxLength !== undefined && Number(value) > field.maxLength) {
        newErrors[field.name] = `${field.label} must be at most ${field.maxLength}`;
      }
    });

    // Password validation
    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!/[!@#$%^&*]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isValid = validateForm();
      if (!isValid) return;

      let response;
      switch (userType) {
        case 'student':
          response = await authApis.StudentRegisterApi(formData);
          break;
        case 'mentor':
          const { confirmPassword, ...mentorData } = formData;
          if (mentorData.experienceYears !== undefined) {
            mentorData.experienceYears = Number(mentorData.experienceYears);
          }
          response = await authApis.MentorRegisterApi(mentorData);
          break;
        case 'company':
          response = await authApis.CompanyRegisterApi(formData);
          break;
        default:
          throw new Error('Invalid user type');
      }

      if (response?.success) {
        nextStep();
        flashMessage(response.message, 'success');
      } else {
        flashMessage(response?.message || 'Registration failed.', 'error');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Form submission handler
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const email = userType === 'company' ? formData.loginEmail : formData.email;
      const { success, ...response } = await authApis.VerifyOtpApi(email, formData.otp);
      if (success) {
        flashMessage(response.message, 'success');
        router.push(APP_ROUTE.LOGIN);
      } else {
        flashMessage(response.message, 'error');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      flashMessage('Something went wrong while verifying OTP', 'error');
    }
  };

  const handleResendOtp = async () => {
    try {
      const email = userType === 'company' ? formData.loginEmail : formData.email;
      const { success, ...response } = await authApis.ResendOtpApi(email);
      if (success) {
        flashMessage('OTP sent successfully', 'success');
      } else {
        flashMessage(response.message, 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      flashMessage('Something went wrong while registering', 'error');
    }
  };

  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendOtpWithTimer = () => {
    if (resendTimer > 0) return;

    handleResendOtp();
    setResendTimer(60);
  };

  const nextStep = () => {
    if (step === 2) {
      const isValid = validateForm();
      if (!isValid) return;
    }

    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  // Render user type selection step
  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-black">Choose Your Role</h2>
        <p className="text-gray-500">Select the option that best describes you</p>
      </div>

      <div className="grid gap-4">
        {(Object.keys(userTypeConfig) as Array<keyof typeof userTypeConfig>).map((type) => {
          const config = userTypeConfig[type];
          return (
            <div
              key={type}
              className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg text-black ${
                userType === type ? 'ring-2 ring-blue-500 shadow-lg' : 'border-gray-200'
              }`}
              onClick={() => setUserType(type)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{config.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{config.title}</h3>
                  <p className="text-gray-500">{config.description}</p>
                </div>
                {userType === type && <CheckCircle className="h-6 w-6 text-blue-500" />}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={nextStep}
        className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        disabled={!userType}
      >
        Continue
      </button>
    </div>
  );

  // Render form fields based on user type
  const renderBasicInfo = () => {
    const fields = getFields();

    return (
      <div className="space-y-6">
        <div className="text-center">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${userTypeConfig[userType].color}`}
          >
            {userTypeConfig[userType].icon} {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </span>
          <h2 className="text-2xl font-bold mt-4 mb-2 text-black">Basic Information</h2>
          <p className="text-gray-500">Tell us about yourself</p>
        </div>

        {errors.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.form}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => {
              if (field.type === 'textarea') return null;

              return (
                <div key={field.name} className="space-y-2">
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label} {field.required && '*'}
                  </label>

                  {field.type === 'select' ? (
                    <div>
                      <select
                        id={field.name}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${
                          errors[field.name] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={field.required}
                      >
                        <option value="">Select...</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors[field.name] && (
                        <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                      )}
                    </div>
                  ) : field.type === 'password' ? (
                    <div>
                      <div className="relative">
                        <input
                          id={field.name}
                          type={showPassword[field.name] ? 'text' : 'password'}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${
                            errors[field.name] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          required={field.required}
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700"
                          onClick={() => togglePasswordVisibility(field.name)}
                        >
                          {showPassword[field.name] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors[field.name] && (
                        <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        id={field.name}
                        type={field.type}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${
                          errors[field.name] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={field.required}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                      />
                      {errors[field.name] && (
                        <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword['confirmPassword'] ? 'text' : 'password'}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword || ''}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    {showPassword['confirmPassword'] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* Render textarea fields */}
          {fields
            .filter((field) => field.type === 'textarea')
            .map((field) => (
              <div key={field.name} className="space-y-2">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label} {field.required && '*'}
                </label>
                <div>
                  <textarea
                    id={field.name}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black ${
                      errors[field.name] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    minLength={field.minLength}
                  />
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={prevStep}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleRegister}
            className="flex-1 px-4 py-2 bg-blue-600 font-medium rounded-md hover:bg-blue-700 text-white cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    );
  };

  // Render final step
  const renderOtpVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-black">Verify OTP</h2>
        <p className="text-gray-500">Enter the OTP sent to your email</p>
      </div>

      {errors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.form}
        </div>
      )}

      <div className="border rounded-lg p-6">
        <div className="space-y-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            OTP
          </label>
          <input
            id="otp"
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={formData.otp || ''}
            onChange={(e) => handleChange('otp', e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.otp ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
        </div>

        <div className="text-right mt-2">
          <button
            type="button"
            onClick={handleResendOtpWithTimer}
            disabled={resendTimer > 0}
            className={`text-sm font-medium ${
              resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'
            }`}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleOtpVerify}
          disabled={isSubmitting || !formData.otp}
          className={`flex-1 px-4 py-2 font-medium rounded-md cursor-pointer ${
            formData.otp
              ? `${userTypeConfig[userType].color} hover:opacity-90`
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Verifying...
            </div>
          ) : (
            'Verify OTP'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Home</span>
          </a>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              CareerGlide
            </div>
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            {step === 1 && renderUserTypeSelection()}
            {step === 2 && renderBasicInfo()}
            {step === 3 && renderOtpVerification()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
