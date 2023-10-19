import { useEffect } from 'react';
import { DISCOUNT_TYPE, IDiscount } from '@/interfaces/IOrder';
import { RenderIf } from './RenderIf';
import useFormControl from '@/hooks/useFormControl';
import FormControl from './FormControl';
import FieldLabel from './FieldLabel';

interface IProps {
  onChange: (discount: IDiscount) => void;
  discountType?: DISCOUNT_TYPE;
  discountAmount?: number | string;
}

export const DiscountTypeControl = (props: IProps) => {
  const { value: discountType, handleChange: handleDiscountType } =
    useFormControl(props.discountType || DISCOUNT_TYPE.FIXED);
  const { value: discountAmount, handleChange: handleChangeDiscountAmount } =
    useFormControl(props.discountAmount || '');

  useEffect(() => {
    props.onChange({
      type: discountType,
      amount: Number(discountAmount),
    });
  }, [discountType, discountAmount]);

  return (
    <section>
      <RenderIf condition={discountType === DISCOUNT_TYPE.PERC}>
        <FormControl
          text={'Descuento:'}
          name="discountAmount"
          type="text"
          value={discountAmount}
          onChange={handleChangeDiscountAmount}
          fullWidth
          posfix="%"
        />
      </RenderIf>
      <RenderIf condition={discountType === DISCOUNT_TYPE.FIXED}>
        <FormControl
          text={'Descuento:'}
          name="discountAmount"
          type="text"
          value={discountAmount}
          onChange={handleChangeDiscountAmount}
          fullWidth
          suffix="$"
        />
      </RenderIf>
      <section className="grid grid-cols-2 w-full">
        <FieldLabel
          title="Fijo $"
          className="label border-2 hover:link p-3 border-stone-500"
        >
          <input
            type="radio"
            name="radio-1"
            className="radio"
            onChange={handleDiscountType}
            value={DISCOUNT_TYPE.FIXED}
            checked={discountType === DISCOUNT_TYPE.FIXED}
          />
        </FieldLabel>
        <FieldLabel
          title="Porcentaje %"
          className="label border-2  hover:link p-3  border-stone-500"
        >
          <input
            type="radio"
            name="radio-1"
            value={DISCOUNT_TYPE.PERC}
            className="radio"
            onChange={handleDiscountType}
            checked={discountType === DISCOUNT_TYPE.PERC}
          />
        </FieldLabel>
      </section>
    </section>
  );
};
