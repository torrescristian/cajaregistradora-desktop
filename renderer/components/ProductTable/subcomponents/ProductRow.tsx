import FormControl from '@/components/FormControl';
import useUpdateProductForm from '@/hooks/useUpdateProduct';
import { UpdateProductButton } from '@/components/ProductItem.styles';
import { IProduct } from '@/interfaces/IProduct';
import ProductVariant from './ProductVariant';
import { useForm } from 'react-hook-form';
import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import ImageControl from '@/components/ImageControl';
import { Card } from '@/components/Card';
import { RenderIf } from '@/components/RenderIf';
import { IVariantExpanded } from '@/interfaces/IVariants';

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
  const { handleChangeName, isLoading, name, pendingChanges } =
    useUpdateProductForm({ product });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      stock: product.default_variant.stock_per_variant?.stock,
      price: product.default_variant.price,
    },
  });

  const updateProductMutation = useUpdateProductMutation();

  const onSubmit = (data: IFormControl) => {
    updateProductMutation.mutate({
      ...data,
      id: product.id,
      name: name,
    });
  };

  return (
    <Card>
      <div className="divider">Producto</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex gap-3">
          <FormControl
            disabled={isLoading}
            fullWidth
            hideLabel
            name="name"
            onChange={handleChangeName}
            text="Nombre"
            type="text"
            value={name}
          />
          <UpdateProductButton
            onClick={handleSubmit(onSubmit)}
            pendingChanges={pendingChanges}
          />
        </section>
        <RenderIf condition={product.variants.length}>
          <div className="divider">Variantes</div>
          <section className="my-5 flex w-full flex-col justify-items-center gap-7 text-xl">
            <ProductVariant
              key={variant.id}
              variant={variant}
              product={product}
            />
          </section>
        </RenderIf>
        <div className="divider">Imagen</div>
      </form>
      <section className="flex flex-col items-center gap-2">
        <ImageControl product={product} />
      </section>
    </Card>
  );
};

export default ProductRow;
