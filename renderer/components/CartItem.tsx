import { formatPrice } from '@/libs/utils';
import { ICollapseTitle } from '@/interfaces/ProductItem.interfaces';
import {
  AddProductButton,
  Badge,
  ClearButton,
  RemoveProductButton,
} from './ProductItem.styles';
import useProductItem from '@/hooks/useProductItem';
import IProductUI from '@/interfaces/IProduct';
import { useState } from 'react';

interface ISelectPriceType {
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
      className="flex flex-1 items-center gap-x-2 gap-y-5 rounded-3xl p-5 text-primary-content shadow-md"
    >
      <section className="flex flex-1 flex-col gap-y-2">
        <p className="font-bold">{product.name}</p>
        <SelectPriceType product={product} onChange={handleChange} />
      </section>
      <section className="flex flex-1 flex-col gap-y-2">
        <section className="flex flex-row items-center justify-end whitespace-nowrap">
          <p>{formatPrice(product.price)} x </p>
          <Badge className="mx-2">{cartItemQuantity}</Badge>
          <p> = {formatPrice(product.price * cartItemQuantity)}</p>
        </section>
        <form>
          <label className="label">
            Nombre:
            <input className="input input-bordered" type="text" />
          </label>
          <label className="label">
            Direccion:
            <input className="input input-bordered" type="text" />
          </label>
          <label className="label">
            Det. adicionales:
            <input className="input input-bordered" type="text" />
          </label>
        </form>
        <section className="flex flex-row justify-end">
          <p>
            {isService
              ? null
              : product.stock === 0
              ? '| Sin stock'
              : `| ${product.stock} en stock`}
          </p>
          <ClearButton onClick={handleClickClear} />
          <RemoveProductButton onClick={handleClickRemove} />
          <AddProductButton onClick={handleClickAdd} disabled={!!disabled} />
        </section>
      </section>
    </section>
  );
};

export default CartItem;
