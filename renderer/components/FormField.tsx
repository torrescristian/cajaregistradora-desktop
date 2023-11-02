import { FieldErrors } from 'react-hook-form';

interface IFormControl {
  register: any;
  label: string;
  formKey: string;
  errors: FieldErrors;
  symbol?: string;
  labelRight?: boolean;
}

const FormField = ({
  register,
  label,
  formKey,
  errors,
  symbol,
  labelRight,
}: IFormControl) => {
  return (
    <div className="form-control w-2/5">
      <label className="label-text">{label}</label>
      <label className="input-group">
        {labelRight ? (
          <>
            <span>{symbol}</span>
            <input
              type="number"
              {...register(formKey)}
              className=" input-bordered input w-28"
            />
          </>
        ) : (
          <>
            <input
              type="number"
              {...register(formKey)}
              className=" input-bordered input w-28"
            />
            <span>{symbol}</span>
          </>
        )}
      </label>
      {/* @ts-ignore */}
      {errors?.[formKey] && (
        <p className="alert bg-red-500 p-4 text-stone-100">
          {/* @ts-ignore */}
          {errors?.[formKey]?.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
