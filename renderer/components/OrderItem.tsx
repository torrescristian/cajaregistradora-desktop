import useProductItem from '@/hooks/useProductItem';
import { IOrderItem } from '@/interfaces/IOrder';
import { RemoveProductButton } from './ProductItem.styles';
import { twMerge } from 'tailwind-merge';
import { convertToEmoji } from '@/libs/utils';
interface IProps {
  item: IOrderItem;
  isEditing: boolean;
}
function OrderItem({ item, isEditing }: IProps) {
  const { handleClickRemove } = useProductItem({
    product: item.product!,
    selectedVariant: item.selectedVariant,
  });

  return (
    <div
      key={item.product!.id}
      className={twMerge(
        'flex flex-row whitespace-nowrap gap-2 ',
        isEditing ? 'justify-end items-center ' : 'justify-start items-end',
      )}
    >
      <p className="text-2xl">{convertToEmoji(item.product!.type)}</p>
      <p>{item.quantity} -</p>
      <p>
        {' '}
        {item.product!.name} - {item.selectedVariant!.name}
      </p>
      {isEditing ? <RemoveProductButton onClick={handleClickRemove} /> : null}
    </div>
  );
}

export default OrderItem;
