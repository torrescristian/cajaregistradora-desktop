import useProductTypeQuery from '@/hooks/services/useProductTypesQuery';
import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import { IProduct, IProductPayload } from '@/interfaces/IProduct';
import { useForm } from 'react-hook-form';

interface IProps {
  product: IProduct;
}

export const ProductTypeMenu = ({ product }: IProps) => {
  const {
    formState: { errors },
    setValue,
  } = useForm<IProductPayload>({
    defaultValues: {
      id: product.id!,
      type: product?.type.id!,
    },
  });
  const productTypesQuery = useProductTypeQuery();
  const productTypes = productTypesQuery.data;

  const updateProductMutation = useUpdateProductMutation();

  const handleChangeProductType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    const productType = productTypes?.find((type) => type.id === value)!;
    setValue('type', productType?.id!);
    updateProductMutation.mutate({
      id: product.id!,
      type: productType.id!,
    });
  };

  return (
    <select
      value={product.type.id!}
      onChange={handleChangeProductType}
      className="select select-bordered"
    >
      <option value={0}>Seleccione un menu</option>
      {productTypes?.map((type) => (
        <option key={type.id} value={type.id}>
          {type.emoji} {type.name}
        </option>
      ))}
    </select>
  );
};
