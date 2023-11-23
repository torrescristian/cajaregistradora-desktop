import useCouponByCodeQuery from '@/modules/ordenes/hooks/useCouponByCodeQuery';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '@/modules/common/components/ErrorMessage';
import { useDebounce } from 'use-debounce';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import SuccessMessage from './SuccessMessage';

interface IProps {
  subtotalPrice: number;
  onChange: ({
    couponDiscount,
    coupon,
  }: {
    couponDiscount: number;
    coupon: ICoupon;
  }) => void;
  coupon?: ICoupon;
}

const ValidateCoupon = ({ subtotalPrice, onChange, coupon }: IProps) => {
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
    onChange({ couponDiscount, coupon: couponByCodeQuery.data! });
  }, [couponDiscount]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <section>
      <label className="text-primary-content">
        Cupon:{' '}
        <input
          className="input input-bordered"
          onChange={handleChangeCode}
          value={code}
        />
      </label>
      <div className="flex flex-row whitespace-nowrap justify-between">
        <RenderIf condition={error && query !== ''}>
          <ErrorMessage>{error}</ErrorMessage>
        </RenderIf>
        <RenderIf condition={couponByCodeQuery.isSuccess && query && !error}>
          <RenderIf
            condition={
              couponByCodeQuery.data?.discount?.type === DISCOUNT_TYPE.FIXED
            }
          >
            <SuccessMessage className="flex justify-between">
              <div>Cupón Valido</div>
              <div>
                descuento de: ${couponByCodeQuery.data?.discount?.amount}
              </div>
            </SuccessMessage>
          </RenderIf>
          <RenderIf
            condition={
              couponByCodeQuery.data?.discount?.type === DISCOUNT_TYPE.PERC
            }
          >
            <SuccessMessage className="flex justify-between">
              <div>Cupón Valido</div>
              <div>
                descuento de: {couponByCodeQuery.data?.discount?.amount}%
              </div>
            </SuccessMessage>
          </RenderIf>
        </RenderIf>
      </div>
    </section>
  );
};

export default ValidateCoupon;
