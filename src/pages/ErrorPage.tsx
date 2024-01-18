import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let message: string = error.data?.message || 'Something went wrong';
    if (error.status === 404) {
      message = 'Page not found';
    }

    return <ErrorAlert title={error.statusText} message={message} />;
  }

  if (error instanceof Error) {
    return <ErrorAlert title={error.name} message={error.message} />;
  }

  return <ErrorAlert title='Unexpected Error' message='Something went wrong' />;
}

interface ErrorComponentProps {
  title: string;
  message: string;
}

function ErrorAlert(props: ErrorComponentProps) {
  return (
    <div className='min-h-screen grid place-items-center'>
      <div>
        <Alert className='w-max'>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Oops! {props.title}</AlertTitle>
          <AlertDescription>{props.message}</AlertDescription>
        </Alert>
        <Button variant='default' className='w-full mt-2'>
          <Link to={'/'}>Go back</Link>
        </Button>
      </div>
    </div>
  );
}
