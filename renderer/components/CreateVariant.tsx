import useProductsQuery from '@/hooks/services/useProductsQuery';
import Loader from './Loader';
import useVariant from '@/hooks/useVariant';
import { useForm } from 'react-hook-form';
import useCreateVariantMutation, {
  IUseCreateVariantMutationProps,
} from '@/hooks/services/useCreateVariantMutation';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from './ErrorMessage';

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) return <Loader />;

  return (
    <input
      className="btn-primary btn mt-5 text-stone-50"
      value="Generar variantes"
      type="submit"
    />
  );
};

export default function CreateVarant() {
  const productsQuery = useProductsQuery({
    query: '',
    selectedCategories: [],
    page: 1,
  });

  const { schema } = useVariant();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUseCreateVariantMutationProps>({
    resolver: yupResolver<any>(schema),
    defaultValues: {
      stock: 0,
      product: 0,
    },
  });

  const formIsInvalid = Object.keys(errors).length > 0;

  const variantMutation = useCreateVariantMutation();

  const onSubmit = handleSubmit((data) => {
    variantMutation.mutate({
      product: data.product,
      stock: data.stock,
      isDefaultVariant: data.isDefaultVariant,
      name: data.name,
      price: data.price,
    });
  });
  return (
    <form
      className="flex w-96 flex-col px-10 py-12 gap-5 h-min  rounded-xl shadow-xl"
      onSubmit={onSubmit}
    >
      <h2 className="text-center text-2xl">Crear Variante</h2>
      <select
        className="select-bordered select w-full max-w-xs "
        {...register('product')}
      >
        {productsQuery.products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <div className="flex flex-col">
        <label className="label">
          <span className="label-text">Stock</span>
        </label>
        <input
          className="input-bordered input"
          type="number"
          {...register('stock')}
        />
        {errors.stock && <ErrorMessage>{errors.stock}</ErrorMessage>}
      </div>
      {productsQuery.isSuccess ? (
        <div className="alert alert-success">🎉 Producto Creado 🎊</div>
      ) : null}
      {productsQuery.isLoading ? (
        <Loader className="mt-5" />
      ) : (
        <SubmitButton isLoading={variantMutation.isLoading} />
      )}
      {formIsInvalid && { errors } &&
        Object.values(errors).map((error) => (
          <ErrorMessage key={error.message}>{error.message}</ErrorMessage>
        ))}
    </form>
  );
}
