import FormControl from '@/components/FormControl';
import useUpdateProductForm from '@/hooks/useUpdateProduct';
import { UpdateProductButton } from '@/components/ProductItem.styles';
import IProductUI from '@/interfaces/IProduct';
import ProductVariant from './ProductVariant';
import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import UploadButton from '@/components/ImageControl';
import useUpdateVariantMutation from '@/hooks/services/useUpdateVariantMutation';
import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import ImageControl from '@/components/ImageControl';


interface IProps {
  product: IProductUI;
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
      stock: product.defaultVariant.stockPerVariant.stock,
      price: product.defaultVariant.price,
    },
  });
  const updateVariantMutation = useUpdateVariantMutation();
  const updateProductMutation = useUpdateProductMutation();
  const onSubmit = (data: IFormControl) => {
    updateProductMutation.mutate({
      ...data,
      id: product.id,
    });
    updateVariantMutation.mutate({
      newStock: Number(data.stock),
      variantId: product.defaultVariant.id,
      stockPerVariantId: product.defaultVariant.stockPerVariant.id!,
      price: product.defaultVariant.price,
    });
  };

  return (
     <section className="block-stone-200 flex w-2/5 flex-col flex-wrap justify-between rounded-xl p-8 shadow-xl">
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
              label="Precio"
              register={register}
              formKey="price"
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
        <ImageControl product={product} />
      </section>
    </section> 


  );
};

export default ProductRow;
