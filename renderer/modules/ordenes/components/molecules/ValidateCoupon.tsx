import React from 'react';

import ErrorMessage from '@/modules/common/components/atoms/ErrorMessage';
import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';

import SuccessMessage from '../atoms/SuccessMessage';
import useValidateCoupon from '../../hooks/useValidateCoupon';

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
  const { code, handleChangeCode, error, query, couponByCodeQuery } =
    useValidateCoupon({ subtotalPrice, onChange, coupon: coupon! });

  return (
    <section>
      <label className="text-base-content">
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
