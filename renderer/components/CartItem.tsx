import { formatPrice } from '@/libs/utils';
import { ICollapseTitle } from '@/interfaces/ProductItem.interfaces';
import {
  AddProductButton,
  Badge,
  ClearButton,
  RemoveProductButton,
} from './ProductItem.styles';
import useProductItem from '@/hooks/useProductItem';

/* interface ISelectPriceType {
  product: IProductUI;
  onChange: (value: number) => void;
}

const SelectPriceType = ({ product, onChange }: ISelectPriceType) => {
  const [selectedPrice, setSelectedPrice] = useState(product.public_price || 0);

  const handleClickSelectPrice = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    setSelectedPrice(Number(value));
    onChange(Number(value));
  };

  return (
    <select
      className="select-bordered select-primary select select-sm w-full"
      onChange={handleClickSelectPrice}
      value={selectedPrice}
    >
      <option value={product.public_price || 0}>
        Precio Público: {product.public_price || 0}
      </option>
      <option value={product.wholesale_price || 0}>
        Precio Mayorista: {product.wholesale_price || 0}
      </option>
      <option value={product.special_price || 0}>
        Precio Especial: {product.special_price || 0}
      </option>
    </select>
  );
};
 */
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
      className="flex flex-col flex-1 items-right gap-x-2 gap-y-5 rounded-3xl p-5 text-primary-content shadow-md"
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
          <section className="flex justify-end">
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
