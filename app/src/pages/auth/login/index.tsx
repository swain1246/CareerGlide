import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { message } from 'antd';
import authApis from '@src/apis/authApis';
import { APP_ROUTE } from '@src/constants';
import flashMessage from '@src/components/FlashMessage';
import { FormBuilder, FormField } from '@src/components/input/FormBuilder';
import { loginValidationSchema } from '@src/components/helper/form/FormValidations';
import { LoginFormValuesType } from '@src/components/helper/form/FormValues';
import { loginFields } from '@src/components/helper/form/FormFields';
import { useEffect } from 'react';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
    console.log('User data:', user);
    if (user.userId) {
      console.log('User is already logged in, redirecting to home');
      router.push(APP_ROUTE.HOME);
    }
  }, [router]);

  const handleLogin = async (values: LoginFormValuesType) => {
    try {
      const { success, ...response } = await authApis.LoginApi(values);
      if (success) {
        flashMessage('Login successful', 'success');
        sessionStorage.setItem('userData', JSON.stringify(response.data));
        router.push(APP_ROUTE.HOME);
      } else {
        flashMessage(response.message, 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Something went wrong while logging in');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[linear-gradient(135deg,hsl(221,83%,53%)_0%,hsl(221,83%,48%)_50%,hsl(24,100%,60%)_100%)] text-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="text-4xl font-bold mb-6">CareerGlide</div>
          <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-white/90 mb-8">
            Continue your journey to career success. Connect, learn, and grow with our platform.
          </p>
          <div className="space-y-3">
            {['Browse Opportunities', 'Connect with Mentors', 'Advance Your Career'].map(
              (feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="relative flex-1 flex items-center justify-center p-8 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-300 via-orange-200 to-cyan-300 opacity-80 -z-10" />
        <div className="w-full max-w-md space-y-8 bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          <Link
            href="/"
            className="group inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="underline-offset-2 group-hover:underline">Back to Home</span>
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-black">Sign In</h1>
            <p className="text-gray-600">Access your CareerGlide account</p>
          </div>

          {/* Form */}
          <FormBuilder<LoginFormValuesType>
            fields={loginFields}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
            submitBtnText="Sign In"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
