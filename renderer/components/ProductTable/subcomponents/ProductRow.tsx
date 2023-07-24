import FormControl from '@/components/FormControl';
import useUpdateProductForm from '@/hooks/useUpdateProduct';
import { UpdateProductButton } from '@/components/ProductItem.styles';
import IProductUI from '@/interfaces/IProduct';
import ProductVariant from './ProductVariant';
import { useForm } from 'react-hook-form';
import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import FormField from '@/components/FormField';
import useUpdateStockProductMutation from '@/hooks/services/useUpdateStockProductMutation';
import UploadButton from '@/components/UploadButton';

interface IProps {
  product: IProductUI;
}
interface IFormControl {
  public_price: number;
  catalog_price: number;
  special_price: number;
  wholesale_price: number;
  stock: number;
  image: string;
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
      public_price: product.public_price,
      catalog_price: product.catalog_price,
      special_price: product.special_price,
      wholesale_price: product.wholesale_price,
      stock: product.stock,
    },
  });
  const updateProductMutation = useUpdateProductMutation();
  const updateStockProductMutation = useUpdateStockProductMutation();
  const onSubmit = (data: IFormControl) => {
    updateProductMutation.mutate({
      ...data,
      id: product.id,
    });
    updateStockProductMutation.mutate({
      stock: Number(data.stock),
      stock_per_product: product.stock_per_product,
    });
  };

  return (
    <section className="block-stone-200 flex w-2/5 flex-col flex-wrap justify-between rounded-xl bg-stone-200 p-8 shadow-xl">
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
        </section>
        <section className="my-5 flex w-full items-end justify-evenly gap-5">
          <FormField
            label="Stock del producto"
            register={register}
            formKey="stock"
            errors={errors}
            symbol="Unid."
            labelRight={false}
          />
          <UpdateProductButton
            onClick={handleSubmit(onSubmit)}
            pendingChanges={pendingChanges}
          />
        </section>

        <section className="my-10 flex flex-col content-center items-center justify-center gap-3">
          <div className="divider">Precios</div>
          <section className="flex w-full justify-around  gap-4">
            <FormField
              label="Público"
              register={register}
              formKey="public_price"
              errors={errors}
              symbol="$"
            />
            <FormField
              label="Catalogo"
              register={register}
              formKey="catalog_price"
              errors={errors}
              symbol="$"
            />
          </section>
          <section className="flex w-full justify-around gap-4">
            <FormField
              label="Especial"
              register={register}
              formKey="special_price"
              errors={errors}
              symbol="$"
            />
            <FormField
              label="Por Mayor"
              register={register}
              formKey="wholesale_price"
              errors={errors}
              symbol="$"
            />
          </section>
        </section>
        {product.variants.length ? (
          <>
            <div className="divider">Variantes</div>
            <section className="my-10 flex w-full flex-col justify-items-center gap-7 text-xl">
              {product.variants.map((v) => (
                <ProductVariant key={v.id} variant={v} />
              ))}
            </section>
          </>
        ) : null}
        <div className="divider">Imagen</div>
      </form>
      <section className="flex flex-col items-center gap-2">
        <UploadButton product={product} />
      </section>
    </section>
  );
};

export default ProductRow;
