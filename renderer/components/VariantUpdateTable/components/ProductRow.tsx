import FormControl from '@/components/FormControl';
import useUpdateProductForm from '@/hooks/useUpdateProduct';
import { UpdateProductButton } from '@/components/ProductItem.styles';
import { IProduct } from '@/interfaces/IProduct';
import { useForm } from 'react-hook-form';
import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import ImageControl from '@/components/ImageControl';
import { Card } from '@/components/Card';
import { IVariantExpanded } from '@/interfaces/IVariants';
import useUpdateVariantMutation from '@/hooks/services/useUpdateVariantMutation';
import RemoveProductItemModal from '@/components/RemoveProductItemModal';
import { TrashIcon } from '@heroicons/react/24/solid';

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
  };

  return (
    <Card>
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
          <button className="flex flex-row whitespace-nowrap btn btn-error gap-3 w-fit">
            <TrashIcon className="w-5 h-5" />
            <p>Eliminar Variante</p>
          </button>
          <RemoveProductItemModal productId={product.id!} />
        </div>
        <div className="divider">Imagen</div>
      </form>
      <section className="flex flex-col items-center gap-2">
        <ImageControl product={product} />
      </section>
    </Card>
  );
};

export default ProductRow;
