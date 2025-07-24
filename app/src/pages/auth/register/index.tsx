import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { APP_ROUTE } from '@src/constants';
import studentApis from '@src/apis/studentApis';
import flashMessage from '@src/components/FlashMessage';
import { Button } from 'antd';
import { FormBuilder, FormField } from "@src/components/Auth/InputForm";
import { registerValidationSchema } from '@src/helper/validations/validationschemas';


type studentRegisterFormValues = {
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

export const studentRegistrationFields: FormField[] = [
  { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter your email" },
  { name: "password", label: "Password", type: "password", required: true, placeholder: "Enter your password" },
  { name: "firstName", label: "First Name", type: "text", required: true, placeholder: "Enter your first name" },
  { name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Enter your last name" },
  { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
  {
    name: "gender", label: "Gender", type: "select", required: true, options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" }
    ]
  },
  { name: "college", label: "College", type: "text", required: true, placeholder: "Enter your college" },
  { name: "degree", label: "Degree", type: "text", required: true, placeholder: "Enter your degree" },
  { name: "registrationNumber", label: "Registration Number", type: "text", required: true, placeholder: "Enter reg. no." },
  { name: "yearOfPassing", label: "Year of Passing", type: "number", required: true, placeholder: "e.g., 2023" },
];

export const otpVerify: FormField[] = [
  { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter your email" },
  { name: "password", label: "Password", type: "password", required: true, placeholder: "Enter your password" },
  { name: "firstName", label: "First Name", type: "text", required: true, placeholder: "Enter your first name" },
  { name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Enter your last name" },
  { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
  {
    name: "gender", label: "Gender", type: "select", required: true, options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" }
    ]
  },
  { name: "college", label: "College", type: "text", required: true, placeholder: "Enter your college" },
  { name: "degree", label: "Degree", type: "text", required: true, placeholder: "Enter your degree" },
  { name: "registrationNumber", label: "Registration Number", type: "text", required: true, placeholder: "Enter reg. no." },
  { name: "yearOfPassing", label: "Year of Passing", type: "number", required: true, placeholder: "e.g., 2023" },
];


const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'student' | 'company' | 'mentor'>('student');

  // User type configuration
  const userTypeConfig = {
    student: {
      title: 'Join as Student',
      description: 'Start your career journey with access to internships and mentors',
      color: 'bg-blue-100 text-blue-800',
      icon: '🎓',
    },
    company: {
      title: 'Join as Company',
      description: 'Find talented students and post internship opportunities',
      color: 'bg-purple-100 text-purple-800',
      icon: '🏢',
    },
    mentor: {
      title: 'Join as Mentor',
      description: 'Share your expertise and guide the next generation',
      color: 'bg-green-100 text-green-800',
      icon: '👨‍🏫',
    },
  };

  const handleStudentSubmit = async (state: studentRegisterFormValues) => {
    const { success, ...response } = await studentApis.StudentRegisterApi(state);
    if (success) {
      flashMessage(response.message, 'success');
      nextStep()
    } else {
      flashMessage(response.message, 'error');
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const Card = ({
    children,
    className = '',
    onClick,
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      {children}
    </div>
  );

  const CardContent = ({
    children,
    className = '',
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={`p-6 ${className}`}>{children}</div>;

  const Badge = ({
    children,
    variant = 'default',
    className = '',
  }: {
    children: React.ReactNode;
    variant?: 'default' | 'outline';
    className?: string;
  }) => {
    const baseClasses = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium';

    const variantClasses = {
      default: 'bg-blue-100 text-blue-800',
      outline: 'border border-gray-300 bg-white text-gray-700',
    };

    return (
      <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>
    );
  };

  // Render steps
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
            <Card
              key={type}
              className={`cursor-pointer transition-all hover:shadow-md ${userType === type ? 'ring-2 ring-blue-500 shadow-md' : ''
                }`}
              onClick={() => setUserType(type)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{config.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-black">{config.title}</h3>
                    <p className="text-gray-500">{config.description}</p>
                  </div>
                  {userType === type && <CheckCircle className="h-6 w-6 text-blue-500" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button onClick={nextStep} className="w-full py-2.5 cursor-pointer" disabled={!userType}>
        Continue
      </Button>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <Badge className={userTypeConfig[userType].color + ' text-base px-4 py-2'}>
          <span className="text-2xl mr-2">{userTypeConfig[userType].icon}</span>
          <span className="font-semibold">
            {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </span>
        </Badge>
        <h2 className="text-2xl font-bold mt-6 mb-2 text-black">Basic Information</h2>
        <p className="text-gray-500">Tell us about yourself to get started</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
        <FormBuilder<studentRegisterFormValues>
          fields={studentRegistrationFields}
          defaultValues={{ email: "", password: "" }}
          validationSchema={registerValidationSchema}
          onSubmit={handleStudentSubmit}
          submitBtnText="Sign In"
        />

      </div>
      <Button onClick={prevStep} className="py-2 px-6">
        Back
      </Button>
    </div>
  );

  const renderFinalStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Almost Done!</h2>
        <p className="text-gray-500">Review and complete your registration</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h1>FINAL</h1>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={prevStep} className="py-2 px-4">
          Back
        </Button>
        <Button
          onClick={() => {
            console.log('Final step submitted');
          }}
          className={`flex-1 py-2.5 ${userTypeConfig[userType].color.replace('text', 'text-white').replace('bg', 'bg')}`}
        >
          Create Account
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Button variant="link">
          <a href={APP_ROUTE.LOGIN}>Sign in here</a>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button className="mb-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-700">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              CareerGlide
            </div>
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${i < step ? 'bg-blue-600' : 'bg-gray-300'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <Card className="shadow-md">
          <CardContent className="p-6 sm:p-8">
            {step === 1 && renderUserTypeSelection()}
            {step === 2 && renderBasicInfo()}
            {step === 3 && renderFinalStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
