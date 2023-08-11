import useProductItem from "@/hooks/useProductItem";
import {  IOrderItemExpanded } from "@/interfaces/IOrder";
import { PRODUCT_TYPE } from "@/interfaces/IProduct"
import { RemoveProductButton } from "./ProductItem.styles";
interface IProps{
    item : IOrderItemExpanded;
}
function OrderItem({ item }:IProps) {

    const {
        handleClickRemove,
        isService
      } = useProductItem(item.product!);

    function convertToEmoji(productType?: PRODUCT_TYPE) {
        switch (productType) {
            case 'PIZZA': {
                return '🍕'
            }
            case 'HAMBURGER': {
                return '🍔'
            }
            case 'SODA': {
                return '🥤'
            }
            case 'PAPAS': {
                return '🍟'
            }
            default: {
                return '🔵'
            }
        }
    }
    return (
        <div
            key={item.product!.id}
            className="flex flex-row p-5 whitespace-nowrap justify-end items-center gap-5 "
        >
            <p className='text-3xl'>{convertToEmoji(item.product!.type)}</p>
            <p>{item.product!.name}</p>
            <p>x{item.quantity}</p>
            <RemoveProductButton onClick={handleClickRemove}  />
        </div>
    )
}

export default OrderItem