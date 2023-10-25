import FormControl from '@/components/FormControl';
import useFormControl from '@/hooks/useFormControl';
import { IProduct } from '@/interfaces/IProduct';
import useUpdateVariantMutation from '@/hooks/services/useUpdateVariantMutation';
import Loader from '@/components/Loader';
import UpdateProductButton from '@/components/UpdateProductButton';
import { RenderIf } from '@/components/RenderIf';
import { IVariantExpanded } from '@/interfaces/IVariants';
import FieldLabel from '@/components/FieldLabel';

interface IProps {
  variant: IVariantExpanded;
  product: IProduct;
}

export default function ProductVariant({ variant, product }: IProps) {
  const initialStock = variant.stock_per_variant?.stock;
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
      stockPerVariantId: variant.stock_per_variant?.id!,
      variantId: variant.id!,
    });
  };

  return (
    <section className="flex w-full flex-row justify-between self-center whitespace-nowrap">
      <section className="flex flex-col items-end justify-end gap-2">
        <section className="flex w-full">
          <FormControl
            fullWidth
            name="name"
            onChange={handleChangeName}
            text="Nombre"
            type="text"
            value={name}
            textAlign="text-center"
          />
          <RenderIf condition={!product.isService}>
            <FormControl
              name="stock"
              onChange={handleChangeStock}
              text="Stock"
              type="number"
              value={stock}
              textAlign="text-center"
              className="w-24"
            />
          </RenderIf>
        </section>
        <section className="flex">
          <FieldLabel className="input-group" title={'$'}>
            <FormControl
              hideLabel
              name="price"
              onChange={handleChangePrice}
              text="Precio"
              type="number"
              value={price}
              textAlign="text-center"
            />
          </FieldLabel>
          <RenderIf condition={isLoading}>
            <Loader className="w-24" />
          </RenderIf>
          <RenderIf condition={!isLoading}>
            <UpdateProductButton
              disabled={
                variant.stock_per_variant?.stock === stock &&
                variant.name === name &&
                variant.price === price
              }
              handleSubmit={handleSubmit}
            />
          </RenderIf>
        </section>
      </section>
    </section>
  );
}
