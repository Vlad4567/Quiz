import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  className?: string;
}

export const InputWithError: React.FC<Props> = ({
  errorText,
  className,
  ...rest
}) => {
  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      <small
        className={twJoin(
          'pl-1 font-bold opacity-0 transition',
          rest.value && 'opacity-100',
        )}
      >
        {rest.placeholder}
      </small>
      <input
        type="text"
        placeholder="Enter quiz title"
        className="border-b-0.5 border-icons pb-2 focus:border-primary"
        {...rest}
      />
      <small className="flex gap-1 text-red">
        <span
          className={twMerge(
            `flex h-4 w-4 items-center justify-center
            rounded-full bg-red text-center text-white opacity-0`,
            errorText && 'opacity-100',
          )}
        >
          !
        </span>
        {errorText}
      </small>
    </div>
  );
};
