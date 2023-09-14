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

interface IProps {
  product: IProduct;
}
interface IFormControl {
  stock: number;
  image: string;
  price: number;
}

const ProductRow = ({ product }: IProps) => {
  const { handleChangeName, isLoading, name, pendingChanges } =
    useUpdateProductForm({ product });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      stock: product.default_variant.stock_per_variant.stock,
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
      <div className="divider">Nombre del Producto</div>
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

        <section className="my-10 flex flex-col content-center items-center justify-center gap-3"></section>
        <RenderIf condition={product.variants.length}>
          <div className="divider">Variantes</div>
          <section className="h-64 overflow-y-scroll my-5 flex w-full flex-col justify-items-center gap-7 text-xl">
            {product.variants.map((v) => (
              <ProductVariant key={v.id} variant={v} product={product} />
            ))}
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
