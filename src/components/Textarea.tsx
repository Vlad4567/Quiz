import { twMerge } from 'tailwind-merge';

/* eslint-disable no-param-reassign */
interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  textareaClassName?: string;
  placeholder?: string;
  autoGrow?: boolean;
  title?: string;
  errorText?: string;
}

export const Textarea: React.FC<Props> = ({
  className = '',
  textareaClassName = '',
  placeholder = '',
  autoGrow = false,
  title = '',
  errorText = '',
  ...rest
}) => {
  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      <small
        className={twMerge(
          'pl-1 font-bold opacity-0 transition',
          rest.value && 'opacity-100',
        )}
      >
        {title || placeholder}
      </small>
      <textarea
        className={twMerge(
          `resize-none overflow-hidden rounded-2xl border-0.5
        border-icons p-2.5 [background:_none] focus:border-primary
        focus:text-primary disabled:border-none disabled:bg-icons`,
          textareaClassName,
        )}
        placeholder={placeholder}
        onInput={
          autoGrow
            ? (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }
            : undefined
        }
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
