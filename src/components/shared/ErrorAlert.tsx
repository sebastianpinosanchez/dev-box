import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
export function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert variant="destructive" role="alert">
      <AlertCircle className="size-4" />
      <AlertTitle>Check your input</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
