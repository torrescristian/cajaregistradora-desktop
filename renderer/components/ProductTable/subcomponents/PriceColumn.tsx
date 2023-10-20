import useUpdateVariantPriceMutation from '@/hooks/services/useUpdateVariantPriceMutation';
import { useState } from 'react';

interface IProps {
  getValue: any;
  row: any;
  column: any;
  table: any;
}

export const PriceColumn = ({ getValue, row, column, table }: IProps) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const updateVariantPriceMutation = useUpdateVariantPriceMutation();

  const onBlurStock = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    updateVariantPriceMutation.mutate({
      newPrice: Number(value),
      variant: row.original,
    });
  };
  return (
    <>
      ${' '}
      <input
        className="input input-bordered w-32"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlurStock}
      />
    </>
  );
};
