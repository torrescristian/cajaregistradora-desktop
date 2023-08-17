import { formatPrice } from '@/libs/utils';
import { ICollapseTitle } from '@/interfaces/ProductItem.interfaces';
import {
  AddProductButton,
  Badge,
  ClearButton,
  RemoveProductButton,
} from './ProductItem.styles';
import useProductItem from '@/hooks/useProductItem';

const CartItem = ({ product }: ICollapseTitle) => {
  const {
    disabled,
    cartItemQuantity,
    handleClickAdd,
    handleClickRemove,
    handleClickClear,
    isService,
    handleClickSelectUpdatePrice,
  } = useProductItem(product);

  const handleChange = (value: number) => {
    handleClickSelectUpdatePrice(value);
  };

  return (
    <section
      data-test="productItem"
      tabIndex={0}
      className="flex flex-col flex-1 items-right gap-x-2 gap-y-5 rounded-3xl p-5 text-primary-content border-2 shadow-md"
    >
      <section className="flex flex-1 flex-col gap-y-2 justify-end items-end">
        <p className="font-bold">{product.name}</p>
      </section>
      <section className="flex flex-1 flex-col gap-y-2">
        <section className="flex flex-row items-center justify-end whitespace-nowrap">
          <p>{formatPrice(product.defaultVariant.price)} x </p>
          <Badge className="mx-2">{cartItemQuantity}</Badge>
          <p>
            {' '}
            = {formatPrice(product.defaultVariant.price * cartItemQuantity)}
          </p>
        </section>
        <section className="flex flex-col justify-end items-end">
          <p>
            {isService
              ? null
              : product.defaultVariant.stockPerVariant.stock === 0
              ? 'Sin stock'
              : `${product.defaultVariant.stockPerVariant.stock} en stock`}
          </p>
          <section className="flex justify-end gap-3">
            <ClearButton onClick={handleClickClear} />
            <RemoveProductButton onClick={handleClickRemove} />
            <AddProductButton onClick={handleClickAdd} disabled={!!disabled} />
          </section>
        </section>
      </section>
    </section>
  );
};

export default CartItem;
