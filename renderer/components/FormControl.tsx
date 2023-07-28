import { mergeClasses } from '@/libs/utils';
import { FormControl } from '@/interfaces/ProductItem.interfaces';

const FormControl = ({
  text,
  name,
  type,
  value,
  onChange,
  fullWidth,
  suffix,
  className,
  disabled,
  hideLabel,
  textAlign,
}: FormControl) => {
  return (
    <section className={mergeClasses('form-control flex w-full', className)}>
      {hideLabel ? null : (
        <label htmlFor={name} className="whitespace-nowrap">
          {text}
        </label>
      )}
      <section
        className={mergeClasses('flex items-center', fullWidth ? 'w-full' : '')}
      >
        {suffix ? <span className="mr-3">{suffix}</span> : null}
        <input
          className={mergeClasses(
            'input-bordered input text-left',
            fullWidth ? 'w-full' : 'w-40',
            disabled ? 'bg-gray-400' : '',
            textAlign || 'text-center',
          )}
          disabled={disabled}
          id={name}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        />
      </section>
    </section>
  );
};

export default FormControl;
