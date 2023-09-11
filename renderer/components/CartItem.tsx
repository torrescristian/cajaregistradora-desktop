import { convertToEmoji, formatPrice } from '@/libs/utils';
import { AddProductButton, RemoveProductButton } from './ProductItem.styles';
import useProductItem from '@/hooks/useProductItem';
import { IProduct, IVariant } from '@/interfaces/IProduct';
import { Card } from './Card';

interface IProps {
  product: IProduct;
  variant: IVariant;
}

const CartItem = ({ product, variant }: IProps) => {
  const { disabled, cartItemQuantity, handleClickAdd, handleClickRemove } =
    useProductItem({ product, selectedVariant: variant });

  return (
    <Card data-test="productItem" tabIndex={0}>
      <p className="font-bold whitespace-nowrap text-2xl">
        {convertToEmoji(product.type)} {product.name}
      </p>
      <p>{variant.name}</p>
      <section className="flex flex-col gap-3 items-center justify-end whitespace-nowrap">
        <p className="flex flex-row whitespace-nowrap items-center gap-2">
          {formatPrice(variant.price * cartItemQuantity)}
        </p>
        <div className="flex flex-row gap-3 w-full justify-end items-center">
          <RemoveProductButton onClick={handleClickRemove} />
          <p>{cartItemQuantity} unid.</p>
          <AddProductButton onClick={handleClickAdd} disabled={!!disabled} />
        </div>
      </section>
    </Card>
  );
};

export default CartItem;
