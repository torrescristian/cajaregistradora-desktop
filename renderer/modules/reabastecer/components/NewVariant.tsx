import FieldLabel from '@/modules/common/components/FieldLabel';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { useForm } from 'react-hook-form';
import useCreateVariantMutation from '@/modules/cupones/hooks/useCreateVariantMutation';

interface IProps {
  product: IProduct;
}

interface IVariantControl {
  name: string;
  price: number;
  stock: number;
  product: number;
  minimum_stock: number;
}

export const NewVariant = ({ product }: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IVariantControl>();

  const createVariantMutation = useCreateVariantMutation();

  const handleSubmitNewVariant = (data: IVariantControl) => {
    createVariantMutation.mutate({
      name: data.name,
      product: product.id!,
      stock: data.stock!,
      minimum_stock: data.minimum_stock!,
      price: data.price,
    });
    reset();
  };

  return (
    <section className="w-full">
      <div className="divider">Agregar nueva variante</div>
      <form
        className="flex flex-col w-full gap-3"
        onSubmit={handleSubmit(handleSubmitNewVariant)}
      >
        <div className="flex flex-col gap-5 w-full">
          <p>Se creara una nueva variante para el producto: </p>
          <p className="font-bold text-center">{product.name}</p>
        </div>
        <FieldLabel columnMode title="Nombre:" className="items-center">
          <input
            className="input input-bordered"
            type="text"
            {...register('name')}
          />
        </FieldLabel>
        <FieldLabel columnMode title="Precio:" className="items-center">
          <input
            className="input input-bordered"
            type="number"
            {...register('price')}
          />
        </FieldLabel>
        <RenderIf condition={!product.isService}>
          <FieldLabel columnMode title="Stock:" className="items-center">
            <input
              className="input input-bordered"
              type="number"
              {...register('stock')}
            />
          </FieldLabel>
          <FieldLabel columnMode title="Stock minimo:" className="items-center">
            <input
              className="input input-bordered"
              type="number"
              {...register('minimum_stock')}
            />
          </FieldLabel>
        </RenderIf>
        <button className="btn btn-primary w-full" type="submit">
          Agregar
        </button>
      </form>
    </section>
  );
};
