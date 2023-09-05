import FormControl from '@/components/FormControl';
import useFormControl from '@/hooks/useFormControl';
import { IVariant } from '@/interfaces/IProduct';
import useUpdateVariantMutation from '@/hooks/services/useUpdateVariantMutation';
import Loader from '@/components/Loader';
import StockButton from '@/components/StockButton';

interface IProps {
  variant: IVariant;
}

export default function ProductVariant({ variant }: IProps) {
  const initialStock = variant.stock_per_variant.stock;
  const { handleChange, value } = useFormControl(initialStock);
  const updateVariantMutation = useUpdateVariantMutation();
  const isLoading = updateVariantMutation.isLoading;

  const handleSubmit = () => {
    updateVariantMutation.mutate({
      newStock: Number(value),
      stockPerVariantId: variant.stock_per_variant.id!,
      price: variant.price,
      variantId: variant.id!,
    });
  };

  return (
    <section className="flex w-full flex-row justify-between self-center whitespace-nowrap">
      <section className="flex flex-col items-end justify-end gap-2">
        <FormControl
          fullWidth
          name="name"
          onChange={handleChange}
          text="Nombre"
          type="text"
          value={variant.name}
          textAlign="text-center"
        />
        <section className="flex items-end gap-5">

          <label className="input-group ">
            <span>Stock</span>
            <FormControl
              className="w-28"
              hideLabel
              name="stock"
              onChange={handleChange}
              text="Stock"
              type="number"
              value={value}
              textAlign="text-center"
            />
          </label>
          <label className='input-group'>
            <span>$</span>
            <FormControl
              className="w-28"
              hideLabel
              name="price"
              onChange={handleChange}
              text="Precio"
              type="number"
              value={variant.price}
              textAlign="text-center"
            />
          </label>
        </section>
        {isLoading ? (
          <Loader />
        ) : (
          <StockButton
            initialStock={initialStock}
            handleSubmit={handleSubmit}
            currentStock={value}
          />
        )}
      </section>
    </section>
  );
}
