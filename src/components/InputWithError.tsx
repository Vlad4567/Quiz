import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'title'> {
  errorText?: string;
  className?: string;
  inputClassName?: string;
  showTitle?: boolean;
  showError?: boolean;
}

export const InputWithError: React.FC<Props> = ({
  errorText,
  className,
  inputClassName,
  showTitle = true,
  showError = true,
  ...rest
}) => {
  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      {showTitle && (
        <small
          className={twJoin(
            'pl-1 font-bold opacity-0 transition',
            rest.value && 'opacity-100',
          )}
        >
          {rest.placeholder}
        </small>
      )}
      <input
        type="text"
        placeholder="Enter quiz title"
        className={twMerge(
          'border-b-0.5 border-icons pb-2 focus:border-primary',
          inputClassName,
        )}
        {...rest}
      />
      {showError && (
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
      )}
    </div>
  );
};
