import { ICollapseTitle } from '@/interfaces/ProductItem.interfaces';
import { AddProductButtonWithText } from './ProductItem.styles';
import useProductItem from '@/hooks/useProductItem';

const ProductItem = ({ product }: ICollapseTitle) => {
  const { disabled, handleClickAdd, isService } = useProductItem(product);

  return (
    <section
      data-test="productItem"
      tabIndex={0}
      className="flex w-1/2 flex-col gap-y-5 rounded-3xl p-5 shadow-md"
    >
      <section
        data-test="productItem.collapse.title.left"
        className="flex flex-1 items-center text-primary-content"
      >
        <div className="flex flex-col gap-5">
          <p className="font-bold text-lg">{product.name} </p>
          <p>
            {isService
              ? null
              : product.stock === 0
              ? ' Sin stock'
              : ` ${product.stock} en stock`}
          </p>
          <p>Una descripcion bien piola del producto</p>
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="w-1/3 m-2 rounded-xl"
        />
      </section>

      <section
        data-test="productItem.collapse.title.right"
        className="form-control flex flex-row items-center justify-end gap-x-1"
      >
        <AddProductButtonWithText
          onClick={handleClickAdd}
          disabled={!!disabled}
        />
      </section>
    </section>
  );
};

export default ProductItem;
