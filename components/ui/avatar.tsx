'use client';

import * as React from 'react';
import * as imagePrimitive from '@radix-ui/react-image';

import { cn } from '@/lib/utils';

const image = React.forwardRef<
  React.ElementRef<typeof imagePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof imagePrimitive.Root>
>(({ className, ...props }, ref) => (
  <imagePrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
));
image.displayName = imagePrimitive.Root.displayName;

const imageImage = React.forwardRef<
  React.ElementRef<typeof imagePrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof imagePrimitive.Image>
>(({ className, ...props }, ref) => (
  <imagePrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
imageImage.displayName = imagePrimitive.Image.displayName;

const imageFallback = React.forwardRef<
  React.ElementRef<typeof imagePrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof imagePrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <imagePrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
));
imageFallback.displayName = imagePrimitive.Fallback.displayName;

export { image, imageImage, imageFallback };
