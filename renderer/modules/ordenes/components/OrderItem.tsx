import useProductItem from '@/modules/products/hooks/useProductItem';
import { IOrderItem } from '@/modules/ordenes/interfaces/IOrder';
import { twMerge } from 'tailwind-merge';
import { RemoveProductButton } from '@/modules/cart/components/ProductItem.styles';
interface IProps {
  item: IOrderItem;
  updateMode?: boolean;
}
function OrderItem({ item, updateMode }: IProps) {
  const { handleClickRemove} = useProductItem({
    product: item.product!,
    selectedVariant: item.selectedVariant,
  });

  return (
    <div
      key={item.product!.id}
      className={twMerge(
        'flex flex-row whitespace-nowrap gap-2 ',
        updateMode ? 'justify-end items-center ' : 'justify-start items-end',
      )}
    >
      <p className="text-2xl">{item.product!.type.emoji}</p>
      <p>{item.quantity} -</p>
      <p>
        {' '}
        {item.product!.name} - {item.selectedVariant!.name}
      </p>
      {updateMode ? <RemoveProductButton onClick={handleClickRemove} /> : null}
    </div>
  );
}

export default OrderItem;
