import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'student' | 'company' | 'mentor'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    college: '',
    year: '',
    companyName: '',
    website: '',
    title: '',
    company: '',
    experience: '',
    bio: '',
    skills: [] as string[],
    agreeToTerms: false,
  });

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

  const handleSubmit = () => {
    console.log('Register:', { userType, ...formData });
    // Mock success - redirect to login
    window.location.href = '/login';
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Custom styled components
  const Button = ({
    children,
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    variant = 'default',
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
    variant?: 'default' | 'outline' | 'ghost' | 'link';
  }) => {
    const baseClasses =
      'flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed';

    const variantClasses = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
      link: 'bg-transparent text-blue-600 hover:text-blue-800 underline p-0',
    };

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  const Input = ({
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    className = '',
  }: {
    id: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
  }) => (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
    />
  );

  const Textarea = ({
    id,
    placeholder,
    value,
    onChange,
    className = '',
  }: {
    id: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
  }) => (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] ${className}`}
    />
  );

  const Label = ({
    htmlFor,
    children,
    className = '',
  }: {
    htmlFor: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
    </label>
  );

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

  const Checkbox = ({
    id,
    checked,
    onChange,
  }: {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
  );

  const Select = ({
    value,
    onChange,
    children,
    placeholder,
  }: {
    value: string;
    onChange: (value: string) => void;
    children: React.ReactNode;
    placeholder: string;
  }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  );

  const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option value={value}>{children}</option>
  );

  // Render steps
  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Role</h2>
        <p className="text-gray-500">Select the option that best describes you</p>
      </div>

      <div className="grid gap-4">
        {(Object.keys(userTypeConfig) as Array<keyof typeof userTypeConfig>).map((type) => {
          const config = userTypeConfig[type];
          return (
            <Card
              key={type}
              className={`cursor-pointer transition-all hover:shadow-md ${
                userType === type ? 'ring-2 ring-blue-500 shadow-md' : ''
              }`}
              onClick={() => setUserType(type)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{config.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{config.title}</h3>
                    <p className="text-gray-500">{config.description}</p>
                  </div>
                  {userType === type && <CheckCircle className="h-6 w-6 text-blue-500" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button onClick={nextStep} className="w-full py-2.5" disabled={!userType}>
        Continue
      </Button>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className={userTypeConfig[userType].color}>
          {userTypeConfig[userType].icon} {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Badge>
        <h2 className="text-2xl font-bold mt-4 mb-2">Basic Information</h2>
        <p className="text-gray-500">Tell us about yourself</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Role-specific fields */}
        {userType === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="college">College/University *</Label>
              <Input
                id="college"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year of Study *</Label>
              <Select
                value={formData.year}
                onChange={(value) => setFormData({ ...formData, year: value })}
                placeholder="Select year"
              >
                <SelectItem value="first">First Year</SelectItem>
                <SelectItem value="second">Second Year</SelectItem>
                <SelectItem value="third">Third Year</SelectItem>
                <SelectItem value="final">Final Year</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
              </Select>
            </div>
          </div>
        )}

        {userType === 'company' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="https://company.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </div>
        )}

        {userType === 'mentor' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Software Engineer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                placeholder="Current company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select
                value={formData.experience}
                onChange={(value) => setFormData({ ...formData, experience: value })}
                placeholder="Select experience"
              >
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </Select>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
      </form>

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} className="py-2 px-4">
          Back
        </Button>
        <Button onClick={nextStep} className="flex-1 py-2.5">
          Continue
        </Button>
      </div>
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
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} className="py-2 px-4">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className={`flex-1 py-2.5 ${userTypeConfig[userType].color.replace('text', 'text-white').replace('bg', 'bg')}`}
          disabled={!formData.agreeToTerms}
        >
          Create Account
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Button variant="link">
          <a href="/login">Sign in here</a>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
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
