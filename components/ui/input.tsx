'use client';

import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full px-4 py-2 rounded-lg border border-gray-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'placeholder:text-gray-400',
        error && 'border-red-500 focus:ring-red-500',
        className
      )}
      {...props}
    />
  );
}
