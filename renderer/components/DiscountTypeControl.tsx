import { useEffect } from 'react';
import { DISCOUNT_TYPE, IDiscount } from '@/interfaces/IOrder';
import { RenderIf } from './RenderIf';
import useFormControl from '@/hooks/useFormControl';
import FormControl from './FormControl';

interface IProps {
  onChange: (discount: IDiscount) => void;
}

export const DiscountTypeControl = ({ onChange }: IProps) => {
  const { value: discountType, handleChange: handleDiscountType } =
    useFormControl(DISCOUNT_TYPE.FIXED);
  const { value: discountAmount, handleChange: handleChangeDiscountAmount } =
    useFormControl('');

  useEffect(() => {
    onChange({
      type: discountType,
      amount: Number(discountAmount),});
  }, [discountType,discountAmount]);

  return (
    <section>
      <section className="grid grid-cols-2 w-full">
        <label className="label border-2 hover:link p-3 border-stone-500">
          <input
            type="radio"
            name="radio-1"
            className="radio"
            onChange={handleDiscountType}
            value={DISCOUNT_TYPE.FIXED}
          />
          Fijo $
        </label>
        <label className="label border-2  hover:link p-3  border-stone-500">
          <input
            type="radio"
            name="radio-1"
            value={DISCOUNT_TYPE.PERC}
            className="radio"
            onChange={handleDiscountType}
            checked={discountType === DISCOUNT_TYPE.PERC}
          />
          Porcentaje %
        </label>
      </section>
      <RenderIf condition={discountType === DISCOUNT_TYPE.PERC}>  
          <FormControl
            text={'Descuento:'}
            name="discountAmount"
            type="text"
            value={discountAmount}
            onChange={handleChangeDiscountAmount}
          />
     
      </RenderIf>
      <RenderIf condition={discountType === DISCOUNT_TYPE.FIXED}>
        <FormControl
        text={'Descuento:'}
        name='discountAmount'
        type='text'
        value={discountAmount}
        onChange={handleChangeDiscountAmount}
         />
      </RenderIf>
    </section>
  );
};
