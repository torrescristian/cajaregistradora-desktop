import { mergeClasses } from '@/modules/common/libs/utils';
import { FormControl } from '@/modules/common/interfaces/ProductItem.interfaces';
import { RenderIf } from './RenderIf';

const FormControl = ({
  text,
  name,
  type,
  value,
  onChange,
  fullWidth,
  suffix,
  posfix,
  className,
  disabled,
  hideLabel,
  textAlign,
}: FormControl) => {
  return (
    <section className={mergeClasses('form-control flex w-full', className)}>
      <RenderIf condition={!hideLabel}>
        <label
          htmlFor={name}
          className="whitespace-nowrap text-stone-500 text-center"
        >
          {text}
        </label>
      </RenderIf>
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
        {posfix ? <span className="ml-3">{posfix}</span> : null}
      </section>
    </section>
  );
};

export default FormControl;
