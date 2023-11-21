import { useState } from 'react';

const useFormControl = (initialValue: any) => {
  const [value, setValue] = useState<any>(initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value } = e.target;

    setValue(value);
  };

  return {
    value,
    setValue,
    handleChange,
  };
};

export default useFormControl;
