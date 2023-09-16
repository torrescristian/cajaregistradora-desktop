import { ICoupon } from "@/interfaces/ICoupon";
import { convertToEmoji, formatPrice, parseDateToArgentinianFormat } from "@/libs/utils";
import { DataItem } from "../DataItem";

interface IProps {
    coupon: ICoupon;
}

export default function Coupon({ coupon }: IProps) {
    return (
        <section className="flex flex-col border-2 border-primary-content p-4 gap-4">
                <DataItem
                    label={"Cupon"}
                />
                <DataItem
                    label={"CÓDIGO:"}
                    value={coupon.code}
                />
                <DataItem
                label="Descuento"
                value={formatPrice(coupon.discount.amount)} 
                />
                <DataItem
                label="Vencimiento"
                value={parseDateToArgentinianFormat(coupon.dueDate)}
                />
                <DataItem
                label="Limite"
                value={formatPrice(coupon.maxAmount)}
                />
                <DataItem
                label="Producto"
                value={`${convertToEmoji(coupon.variant.product.type)} ${coupon.variant.product.name} ${coupon.variant.name}`}
                />
                <DataItem
                label="Cupones restantes"
                value={coupon.availableUses}
                />
        </section>
    )
}