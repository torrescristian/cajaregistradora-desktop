import { toPositiveNumber } from '@/libs/utils';
import useFormControl from './useFormControl';

const useFormNumbericControl = (initialValue: any) => {
  const { value, setValue } = useFormControl(initialValue);

  const incrementBy = (delta: number) => () => {
    setValue((prevValue: number) => toPositiveNumber(prevValue) + delta);
  };

  const decrementBy = (delta: number) => () => {
    setValue((prevValue: number) => toPositiveNumber(prevValue - delta));
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === '') {
      setValue('');
    } else {
      setValue(toPositiveNumber(value));
    }
  };

  return {
    value,
    setValue,
    handleChange: handleNumericChange,
    incrementBy,
    decrementBy,
  };
};

export default useFormNumbericControl;
