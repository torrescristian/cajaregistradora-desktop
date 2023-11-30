import { DISCOUNT_TYPE } from "@/modules/ordenes/interfaces/IOrder";
import { useState } from "react";

interface IProps {
    discountType?: DISCOUNT_TYPE;
    discountAmount?: number;
}

export default function useCalcDiscountType(props: IProps = {}) {

    const [discountType, setDiscountType] = useState<DISCOUNT_TYPE>(props.discountType || DISCOUNT_TYPE.FIXED);
    const [discountAmount, setDiscountAmount] = useState<number | string>(props.discountAmount || '');

    return { discountType, discountAmount, setDiscountType, setDiscountAmount } as const;
}