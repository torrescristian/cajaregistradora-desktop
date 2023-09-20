import useCouponByCodeQuery from '@/hooks/services/useCouponByCodeQuery';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import { useDebounce } from 'use-debounce';
import { RenderIf } from '../RenderIf';
import { DISCOUNT_TYPE } from '@/interfaces/IOrder';
import { ICoupon } from '@/interfaces/ICoupon';

interface IProps {
  subtotalPrice: number;
  onChange: ({couponDiscount,coupon}: {couponDiscount:number, coupon: ICoupon}) => void;
  coupon?: ICoupon;
}

const ValidateCoupon = ({ subtotalPrice, onChange,coupon }: IProps) => {
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
    console.log(couponByCodeQuery.data.dueDate);
    if (Number(new Date(couponByCodeQuery.data.dueDate)) < Date.now()) {
      setError('Este cupón ya expiro');
      return;
    }
    setError('');
    calcDiscount();
  }, [couponByCodeQuery.data]);

  useEffect(() => {
    onChange({couponDiscount,coupon : couponByCodeQuery.data!});
  }, [couponDiscount]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <section>
      <label className="text-primary-content">
        Cupon:{' '}
        <input className="input input-bordered" onChange={handleChangeCode} value={code} />
      </label>
      <RenderIf condition={error && query !== ''}>
        <ErrorMessage>{error}</ErrorMessage>
      </RenderIf>
      <RenderIf condition={couponByCodeQuery.isSuccess && query && !error}>
        <p className="text-primary-content">Cupón Valido</p>
        <RenderIf
          condition={
            couponByCodeQuery.data?.discount?.type === DISCOUNT_TYPE.FIXED
          }
        >
          <p>Descuento: ${couponByCodeQuery.data?.discount?.amount}</p>
        </RenderIf>
        <RenderIf
          condition={
            couponByCodeQuery.data?.discount?.type === DISCOUNT_TYPE.PERC
          }
        >
          <p>Descuento: {couponByCodeQuery.data?.discount?.amount}%</p>
        </RenderIf>
      </RenderIf>
    </section>
  );
};

export default ValidateCoupon;
