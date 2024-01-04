import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import useCouponByCodeQuery from './useCouponByCodeQuery';
import { DISCOUNT_TYPE } from '../interfaces/IOrder';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';

interface IProps {
  subtotalPrice: number;
  coupon: ICoupon;
  onChange?: (data: any) => void;
}

export default function useValidateCoupon({
  coupon,
  onChange,
  subtotalPrice,
}: IProps) {
  const [code, setCode] = useState(coupon?.code || '');
  const [error, setError] = useState('');

  const [couponDiscount, setCouponDiscount] = useState(0);

  const [query] = useDebounce(code, 500);

  const couponByCodeQuery = useCouponByCodeQuery(query);

  const calcDiscount = () => {
    const { discount, maxAmount } = couponByCodeQuery.data!;
    if (discount?.type === DISCOUNT_TYPE.FIXED) {
      setCouponDiscount(discount?.amount);
      return;
    }
    if (discount?.type === DISCOUNT_TYPE.PERC) {
      const discountAmount = (discount?.amount / 100) * subtotalPrice;
      setCouponDiscount(Math.min(discountAmount, maxAmount));
      console.log({ discountAmount, discount, subtotalPrice });
      return;
    }
  };
  useEffect(() => {
    setCouponDiscount(0);
    if (!couponByCodeQuery.isSuccess) {
      return;
    }
    if (!couponByCodeQuery.data) {
      setError('No existe el Cupón');
      return;
    }
    if (couponByCodeQuery.data.availableUses === 0) {
      setError('Este cupón ya se encuentra usado');
      return;
    }
    if (Number(new Date(couponByCodeQuery.data.dueDate!)) < Date.now()) {
      setError('Este cupón ya expiro');
      return;
    }
    setError('');
    calcDiscount();
  }, [couponByCodeQuery.data]);

  useEffect(() => {
    if (onChange) onChange({ couponDiscount, coupon: couponByCodeQuery.data! });
  }, [couponDiscount]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleClearInputCode = () => {
    setCode('');
    setCouponDiscount(0);
  };

  return {
    code,
    handleChangeCode,
    error,
    query,
    couponByCodeQuery,
    handleClearInputCode,
  };
}
