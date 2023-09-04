import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

interface CheckboxButtonProps {
  label: string;
  name: string;
  register: any;
  errors: DeepMap<Record<string, any>, FieldError>;
}

const CheckboxButton: React.FC<CheckboxButtonProps> = ({
  label,
  name,
  register,
  errors,
}) => {
  const error = errors[name];

  return (
    <div>
      <label className="label w-fit gap-3">
        <input
          type="checkbox"
          className="checkbox checkbox-success"
          {...register(name)}
        />
        {label}
      </label>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
};

export default CheckboxButton;
