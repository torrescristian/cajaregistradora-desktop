import useProductItem from '@/modules/products/hooks/useProductItem';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IVariant } from '@/modules/common/interfaces/IVariants';
import { Card } from '../../common/components/Card';
import { AddProductButton, RemoveProductButton } from './ProductItem.styles';
import { formatPrice } from '@/modules/common/libs/utils';

interface IProps {
  product: IProduct;
  variant: IVariant;
}

const CartItem = ({ product, variant }: IProps) => {
  const { cartItemQuantity, handleClickAdd, handleClickRemove } =
    useProductItem({ product, selectedVariant: variant });

  return (
    <Card data-test="productItem" tabIndex={0}>
      <p className="font-bold whitespace-nowrap text-2xl">
        {product.type.emoji} {product.name}
      </p>
      <p>{variant.name}</p>
      <section className="flex flex-col gap-3 items-center justify-end whitespace-nowrap">
        <p className="flex flex-row whitespace-nowrap items-center gap-2">
          {formatPrice(variant.price * cartItemQuantity)}
        </p>
        <div className="flex flex-row gap-3 w-full justify-end items-center">
          <RemoveProductButton onClick={handleClickRemove} />
          <p>{cartItemQuantity} unid.</p>
          <AddProductButton onClick={handleClickAdd} />
        </div>
      </section>
    </Card>
  );
};

export default CartItem;
