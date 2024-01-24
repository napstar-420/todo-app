import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin, CodeResponse } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BiError } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/use-auth';
import config from '../config';
import axios from '@/api/axios';
import loginIllustration from '../assets/login-page-illustration.png';

export default function LoginPage() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(false);

  const from: string = location.state?.from?.pathname || '/';

  const handleGoogleSuccess = async (codeResponse: CodeResponse) => {
    setIsValidating(true);
    setError(false);

    try {
      const { code } = codeResponse;
      const response = await axios.post(config.API.AUTH.GOOGLE_LOGIN, { code });
      const user = response.data.user;
      const accessToken = response.data.accessToken;
      setAuth({ user, accessToken });
      navigate(from);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: handleGoogleSuccess,

    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className='w-full min-h-screen grid grid-rows-[auto_1fr] mlg:grid-rows-1 mlg:grid-cols-2 p-4 gap-6'>
      <div className='bg-[#111] grid text-white rounded-2xl p-8 grid-rows-[auto_1fr]'>
        <h1 className='text-3xl font-bold tracking-tight lg:text-5xl break-words'>
          {config.APP_NAME.split(' ')[0]}
          <br />
          {config.APP_NAME.split(' ')[1]}.
        </h1>
        <div className='place-self-center'>
          <img
            className='max-w-32 sm:max-w-48 lg:max-w-64 xl:max-w-sm rotate-90'
            src={loginIllustration}
            alt='Login illustration'
          />
        </div>
      </div>
      <div className='grid place-items-center'>
        <div className='max-w-96 sm:min-w-96'>
          <h2 className='scroll-m-20 pb-6 text-5xl font-semibold tracking-tight first:mt-0'>
            Sign in
          </h2>
          {error && <ErrorAlert />}
          <form
            onSubmit={(e) => e.preventDefault()}
            className='w-full grid grid-cols-1 grid-rows-3 gap-3'
          >
            <Input type='email' placeholder='Email' />
            <Input type='password' placeholder='Password' />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='default'
                  className='bg-primary hover:bg-primary-darken text-[#111] text-lg font-semibold'
                >
                  Sign in
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Opps! We can't log you in</AlertDialogTitle>
                  <AlertDialogDescription>
                    I haven't supported login with email and password, although
                    it is more easy than login with Google, but i am lazy XD. So
                    yeah just{' '}
                    <span className='font-semibold'>Continue with Google</span>{' '}
                    and enjoy the app.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>No worries</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
          <div className='w-full grid grid-cols-[1fr_auto_1fr] my-4 items-center gap-10 text-slate-400 font-medium'>
            <div className='flex-1 h-[1px] bg-slate-300' />
            <div>or</div>
            <div className='flex-1 h-[1px] bg-slate-300' />
          </div>
          <Button
            variant='outline'
            className='w-full text-lg border-2 py-6'
            onClick={handleGoogleLogin}
            disabled={isValidating}
          >
            <FcGoogle className='text-2xl mr-4' />{' '}
            {isValidating ? 'Logging in' : 'Continue with Google'}
            {isValidating && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ErrorAlert() {
  return (
    <Alert variant='destructive' className='mb-4'>
      <BiError className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong, please try again
      </AlertDescription>
    </Alert>
  );
}
