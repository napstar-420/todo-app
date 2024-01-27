import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorAlertProps {
  title: string;
  message: string;
}

export default function ErrorAlert({ title, message }: ErrorAlertProps) {
  return (
    <Alert variant='destructive'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
