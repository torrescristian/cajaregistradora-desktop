import { formatPrice } from '@/libs/utils';
import { ICollapseTitle } from '@/interfaces/ProductItem.interfaces';
import {
  AddProductButton,
  Badge,
  RemoveProductButton,
} from './ProductItem.styles';
import useProductItem from '@/hooks/useProductItem';

const CartItem = ({ product }: ICollapseTitle) => {
  const {
    disabled,
    cartItemQuantity,
    handleClickAdd,
    handleClickRemove,
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
      className="flex flex-col gap-5 rounded-3xl p-5 items-start text-primary-content border-2 shadow-md"
    >
      <p className="font-bold">{product.name}</p>
      <select className='select w-full'>
        {product.variants.map((variant) => (
          <option value={variant.name} onClick={() => handleChange}>{variant.name}</option>
        ))}
      </select>
      <section className="flex flex-row gap-3 items-center justify-end whitespace-nowrap">
        <p className="flex flex-row whitespace-nowrap items-center gap-2">
          <Badge>x{cartItemQuantity}</Badge>={' '}
          {formatPrice(product.default_variant.price * cartItemQuantity)}
        </p>
        <RemoveProductButton onClick={handleClickRemove} />
        <AddProductButton onClick={handleClickAdd} disabled={!!disabled} />
      </section>
    </section>
  );
};

export default CartItem;
