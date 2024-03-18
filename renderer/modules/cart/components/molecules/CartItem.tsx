import useProductItem from '@/modules/products/hooks/useProductItem';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IVariant } from '@/modules/common/interfaces/IVariants';
import { Card } from '../../../common/components/atoms/Card';
import { RemoveProductButton } from '../ProductItem.styles';
import { formatPrice } from '@/modules/common/libs/utils';
import AddProductButton from '@/modules/common/components/atoms/AddProductButton';

interface IProps {
  product: IProduct;
  variant: IVariant;
}

const CartItem = ({ product, variant }: IProps) => {
  const { cartItemQuantity, handleClickAdd, handleClickRemove } =
    useProductItem({ product, selectedVariant: variant });

  return (
    <Card
      data-test="productItem"
      className="items-end gap-3 text-base-content"
      tabIndex={0}
    >
      <p className="font-bold whitespace-nowrap self-start">
        {product.type.emoji} {product.name} - {variant.name}
      </p>
      <div className="flex flex-row gap-3 w-full justify-end items-center">
        <p className="flex flex-col text-right">
          <span>&times;{cartItemQuantity} unid. </span>
          <span>= {formatPrice(variant.price * cartItemQuantity)}</span>
        </p>
        <RemoveProductButton onClick={handleClickRemove} />
        <AddProductButton onClick={handleClickAdd} />
      </div>
    </Card>
  );
};

export default CartItem;
