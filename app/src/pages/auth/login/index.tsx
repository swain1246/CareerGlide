import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { KeyPairInterface } from '@src/redux/interfaces';
import { GlobalInputFieldType } from '@src/components/input/GlobalInput';
import { AuthFormInput } from '@src/components/Auth/AuthFormInput';
import authApis from '@src/apis/authApis';
import { message } from 'antd';
import { APP_ROUTE } from '@src/constants';
import flashMessage from '@src/components/FlashMessage';

const LoginPage = () => {
  const router = useRouter();
  const [state, setState] = useState<KeyPairInterface>({});
  const loginFields: GlobalInputFieldType[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      dataType: 'email',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      dataType: 'password',
      required: true,
    },
  ];

  // useEffect(() => {
  //   flashMessage('User created successfully', 'success');
  // }, []);
  const handleLogin = async () => {
    try {
      const { success, ...response } = await authApis.LoginApi(state);
      if (success) {
        flashMessage('Login successful', 'success');
        router.push(APP_ROUTE.HOME);
        console.log('Login response:', response);
      } else {
        flashMessage(response.message, 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Something went wrong while logging in');
    }
  };

  return (
    <>
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

            <AuthFormInput
              state={state}
              setState={setState}
              fields={loginFields}
              onSubmit={handleLogin}
              buttonTitle="Sign In"
              forgotPasswordLink
              signUpLink
              rememberMe
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
