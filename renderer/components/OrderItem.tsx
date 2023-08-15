import useProductItem from "@/hooks/useProductItem";
import { IOrderItem } from "@/interfaces/IOrder";
import { PRODUCT_TYPE } from "@/interfaces/IProduct"
import { RemoveProductButton } from "./ProductItem.styles";
import { twMerge } from "tailwind-merge";
interface IProps {
    item: IOrderItem;
    isEditing: boolean;
}
function OrderItem({ item, isEditing }: IProps) {

    const {
        handleClickRemove,
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

            className={twMerge("flex flex-row whitespace-nowrap gap-2 ", isEditing ? "justify-end items-center " : "justify-start items-end")}
        >
            <p className='text-2xl'>{convertToEmoji(item.product!.type)}</p>
            <p>{item.quantity} -</p>
            <p> {item.product!.name}</p>
            {isEditing ? <RemoveProductButton onClick={handleClickRemove} /> : null}

        </div>
    )
}

export default OrderItem