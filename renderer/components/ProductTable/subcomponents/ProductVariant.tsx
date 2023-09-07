import FormControl from '@/components/FormControl';
import useFormControl from '@/hooks/useFormControl';
import { IVariant } from '@/interfaces/IProduct';
import useUpdateVariantMutation from '@/hooks/services/useUpdateVariantMutation';
import Loader from '@/components/Loader';
import StockButton from '@/components/UpdateProductButton';

interface IProps {
  variant: IVariant;
}

export default function ProductVariant({ variant }: IProps) {
  const initialStock = variant.stock_per_variant.stock;
  const nameVariants = variant.name;
  const priceVariants = variant.price;

  const { handleChange: handleChangeStock, value: stock } =
    useFormControl(initialStock);
  const { handleChange: handleChangeName, value: name } =
    useFormControl(nameVariants);
  const { handleChange: handleChangePrice, value: price } =
    useFormControl(priceVariants);

  const updateVariantMutation = useUpdateVariantMutation();

  const isLoading = updateVariantMutation.isLoading;

  const handleSubmit = () => {
    updateVariantMutation.mutate({
      newStock: Number(stock),
      name: name,
      price: price,
      stockPerVariantId: variant.stock_per_variant.id!,
      variantId: variant.id!,
    });
  };

  return (
    <section className="flex w-full flex-row justify-between self-center whitespace-nowrap">
      <section className="flex flex-col items-end justify-end gap-2">
        <FormControl
          fullWidth
          name="name"
          onChange={handleChangeName}
          text="Nombre"
          type="text"
          value={name}
          textAlign="text-center"
        />
        <section className="flex items-end gap-5">
          <label className="input-group ">
            <span>Stock</span>
            <FormControl
              className="w-28"
              hideLabel
              name="stock"
              onChange={handleChangeStock}
              text="Stock"
              type="number"
              value={stock}
              textAlign="text-center"
            />
          </label>
          <label className="input-group">
            <span>$</span>
            <FormControl
              className="w-28"
              hideLabel
              name="price"
              onChange={handleChangePrice}
              text="Precio"
              type="number"
              value={price}
              textAlign="text-center"
            />
          </label>
        </section>
        {isLoading ? (
          <Loader />
        ) : (
          <StockButton
            disabled={
              variant.stock_per_variant.stock === stock &&
              variant.name === name &&
              variant.price === price
            }
            handleSubmit={handleSubmit}
          />
        )}
      </section>
    </section>
  );
}
