import useUpdateStockPerVariantMutation from '@/hooks/services/useUpdateStockPerVariantMutation';
import { useState } from 'react';

interface IProps {
  getValue: any;
  row: any;
  column: any;
  table: any;
}

export const StockColumn = ({ getValue, row, column, table }: IProps) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const updateStockPerVariantMutation = useUpdateStockPerVariantMutation();

  const onBlurStock = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    updateStockPerVariantMutation.mutate({
      newStock: Number(value),
      stockPerVariant: row.original.stock_per_variant,
    });
  };
  return (
    <input
      className="input input-bordered w-32"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlurStock}
      disabled={row.original.product.isService}
    />
  );
};
