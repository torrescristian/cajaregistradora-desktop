import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Label from './Label';

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const FormInput = forwardRef(function FormInput(
  { className, label, ...props }: IProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <Label>
      <span>{label}</span>
      <input
        className={twMerge('input input-bordered', className)}
        ref={ref}
        autoComplete="off"
        {...props}
      />
    </Label>
  );
});

export default FormInput;
