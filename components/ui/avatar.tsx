'use client';

import Image from 'next/image';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 48,
};

export function Avatar({ src, alt = '', size = 'md', className }: AvatarProps) {
  const dimension = sizeMap[size];

  return (
    <div
      className={clsx(
        'relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0',
        className
      )}
      style={{ width: dimension, height: dimension }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${dimension}px`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
