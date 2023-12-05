import FieldLabel from '@/modules/common/components/FieldLabel';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { IProduct } from '@/modules/products/interfaces/IProduct';

interface IProps {
  product: IProduct;
}

export const NewVariant = ({ product }: IProps) => {
  /* const createNewVariant = useCreateNewVariant(); */

  return (
    <section className="w-full">
      <div className="divider">Agregar nueva variante a {product.name}</div>
      <form className="flex flex-col w-full">
        <FieldLabel title="Nombre">
          <input className="input input-bordered" />
        </FieldLabel>
        <FieldLabel title="precio">
          <input className="input input-bordered" />
        </FieldLabel>
        <RenderIf condition={!product.isService}>
          <FieldLabel title="stock">
            <input className="input input-bordered" />
          </FieldLabel>
        </RenderIf>
        <button className="btn btn-primary w-full">Agregar</button>
      </form>
    </section>
  );
};
