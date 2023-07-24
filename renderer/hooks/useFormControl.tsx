import { useEffect, useState } from 'react';

const useFormControl = (initialValue: any) => {
  const [value, setValue] = useState<any>(0);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
