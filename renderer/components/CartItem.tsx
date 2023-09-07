import { formatPrice } from '@/libs/utils';
import {
  AddProductButton,
  Badge,
  RemoveProductButton,
} from './ProductItem.styles';
import useProductItem from '@/hooks/useProductItem';
import { IProduct, IVariant } from '@/interfaces/IProduct';

interface IProps {
  product: IProduct;
  variant: IVariant;
}

const CartItem = ({ product, variant }: IProps) => {
  const {
    disabled,
    cartItemQuantity,
    handleClickAdd,
    handleClickRemove,
    isService,
  } = useProductItem({product, selectedVariant: variant});

  return (
    <section
      data-test="productItem"
      tabIndex={0}
      className="flex flex-col gap-5 rounded-3xl p-5 items-start text-primary-content border-2 shadow-md"
    >
      <p className="font-bold">{product.name} - {variant.name} </p>
      <section className="flex flex-row gap-3 items-center justify-end whitespace-nowrap">
        <p className="flex flex-row whitespace-nowrap items-center gap-2">
          <Badge>x{cartItemQuantity}</Badge>={' '}
          {formatPrice(variant.price * cartItemQuantity)}
        </p>
        <RemoveProductButton onClick={handleClickRemove} />
        <AddProductButton onClick={handleClickAdd} disabled={!!disabled} />
      </section>
    </section>
  );
};

export default CartItem;
