import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import FormControl from '@/modules/common/components/molecules/FormControl';
import useUpdateProductForm from '@/modules/reabastecer/hooks/useUpdateProduct';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import useUpdateProductMutation from '@/modules/reabastecer/hooks/useUpdateProductMutation';
import ImageControl from '@/modules/reabastecer/components/ImageControl';
import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import useUpdateVariantMutation from '@/modules/reabastecer/hooks/useUpdateVariantMutation';
import UpdateProductButton from '@/modules/common/components/atoms/UpdateProductButton';

import RemoveVariantModal from './RemoveVariantModal';
import ChangeIsService from './ChangeIsService';

interface IProps {
  product: IProduct;
  variant: IVariantExpanded;
}
interface IFormControl {
  stock: number;
  image: string;
  price: number;
}

const ProductRow = ({ product, variant }: IProps) => {
  const {
    handleChangeName,
    isLoading,
    productName,
    handleChangeVariantName,
    variantName,
    pendingChanges,
  } = useUpdateProductForm({ product, variant });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      stock: product.default_variant.stock_per_variant?.stock,
      price: product.default_variant.price,
    },
  });

  const updateProductMutation = useUpdateProductMutation();
  const updateVariantMutation = useUpdateVariantMutation();

  const onSubmit = (data: IFormControl) => {
    console.log(data);
    updateProductMutation.mutate({
      ...data,
      id: product.id,
      name: productName,
    });
    updateVariantMutation.mutate({
      id: variant.id!,
      name: variantName,
    });
    toast.success('Actualización Exitosa!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex items-end gap-3">
          <FormControl
            disabled={isLoading}
            fullWidth
            name="productName"
            onChange={handleChangeName}
            text="Producto"
            type="text"
            value={productName}
          />
          <FormControl
            fullWidth
            name="variantName"
            onChange={handleChangeVariantName}
            text="Variante"
            type="text"
            value={variantName}
            textAlign="text-center"
          />
          <UpdateProductButton
            onClick={handleSubmit(onSubmit)}
            pendingChanges={pendingChanges}
            isLoading={
              updateProductMutation.isLoading || updateVariantMutation.isLoading
            }
          />
        </section>
        <div className="divider">Mas opciónes</div>
        <div className="flex flex-col w-full items-center">
          <RemoveVariantModal variant={variant} />
          <ChangeIsService product={product} />
        </div>
        <div className="divider">Imagen</div>
      </form>
      <section className="flex flex-col items-center gap-2">
        <ImageControl product={product} />
      </section>
    </div>
  );
};

export default ProductRow;
