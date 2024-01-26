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
import { Separator } from '@/components/ui/separator';

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
    <div className='w-full min-h-screen grid place-items-center p-4'>
      <div className='max-w-96 sm:min-w-96'>
        <div className='flex flex-col space-y-2 text-center mb-8'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Create an account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email below to create your account
          </p>
        </div>
        {error && <ErrorAlert />}
        <form
          onSubmit={(e) => e.preventDefault()}
          className='w-full grid grid-cols-1 grid-rows-3 gap-3'
        >
          <Input type='email' placeholder='Email' />
          <Input type='password' placeholder='Password' />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='default'>Sign in</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Opps! We can't log you in</AlertDialogTitle>
                <AlertDialogDescription>
                  I haven't supported login with email and password, although it
                  is more easy than login with Google, but i am lazy XD. So yeah
                  just{' '}
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
        <div className='w-full grid grid-cols-[1fr_auto_1fr] my-4 items-center gap-10'>
          <Separator />
          <p className='text-sm text-muted-foreground'>or continue with</p>
          <Separator />
        </div>
        <Button
          variant='outline'
          className='w-full'
          onClick={handleGoogleLogin}
          disabled={isValidating}
        >
          <FcGoogle className='mr-4 text-xl' />
          {isValidating ? 'Logging in' : 'Continue with Google'}
          {isValidating && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
        </Button>
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
