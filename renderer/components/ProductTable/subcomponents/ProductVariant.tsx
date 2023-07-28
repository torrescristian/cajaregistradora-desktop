import FormControl from '@/components/FormControl';
import useFormControl from '@/hooks/useFormControl';
import { IVariantUI } from '@/interfaces/IProduct';
import { toLC } from '@/libs/utils';
import useUpdateVariantMutation from '@/hooks/services/useUpdateVariantMutation';
import Loader from '@/components/Loader';
import StockButton from '@/components/StockButton';

interface IProps {
  variant: IVariantUI;
}

export default function ProductVariant({ variant }: IProps) {
  const { categories, stock } = variant;
  const { handleChange, value } = useFormControl(stock);
  const updateVariantMutation = useUpdateVariantMutation();
  const isLoading = updateVariantMutation.isLoading;

  const handleSubmit = () => {
    updateVariantMutation.mutate({
      stock: Number(value),
      stockPerVariant: structuredClone(variant.stock_per_variant),
    });
  };

  return (
    <section className="flex w-full flex-row justify-between self-center whitespace-nowrap">
      <section className="flex">
        {categories
          .filter(
            (c) => !['articulos', 'modelos'].includes(toLC(c.parent.name)),
          )
          .map((c) => (
            <p key={c.id} className="text-bold self-center">
              {c.name}
            </p>
          ))}
      </section>
      <section className="flex flex-col items-end justify-end gap-1">
        <section className="flex items-center gap-5">
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
        </section>
        {isLoading ? (
          <Loader />
        ) : (
          <StockButton
            initialStock={stock}
            handleSubmit={handleSubmit}
            currentStock={value}
          />
        )}
      </section>
    </section>
  );
}
