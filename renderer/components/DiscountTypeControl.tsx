import { useEffect, useState } from 'react';
import FormFieldText from './FormFieldText';
import { DISCOUNT_TYPE } from '@/interfaces/IOrder';
import { RenderIf } from './RenderIf';
import useFormControl from '@/hooks/useFormControl';
import FormControl from './FormControl';

interface IProps {
  register?: any;
  errors: any;
  // en el onchange devolver discount type y discount amount
  // onChange: ({ discountType, discountAmount }: { discountType: DISCOUNT_TYPE, discountAmount: number }) => void;
  // recordar actualizar donde actualmente se usa
  onChange: (discountType: DISCOUNT_TYPE) => void;
}

export const DiscountTypeControl = ({ register, errors, onChange }: IProps) => {
  const { value: discountType, handleChange: handleDiscountType } =
    useFormControl(DISCOUNT_TYPE.FIXED);
  const {value: discountAmount, handleChange : handleChangeDiscountAmount, } = useFormControl('');

  useEffect(() => {
    onChange(discountType);
  }, [discountType]);

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
      <RenderIf condition={Boolean(register)}>
        <FormFieldText
          register={register}
          label={'Descuento:'}
          formKey="discountAmount"
          errors={errors}
          symbol={'%'}
        />
      </RenderIf>
      <RenderIf condition={!register}>
        <FormControl
          text={'Descuento:'}
          name='discountAmount'
          type='text'
          value={discountAmount}
          onChange={handleChangeDiscountAmount}
        />
      </RenderIf>
      </RenderIf>
      <RenderIf condition={discountType === DISCOUNT_TYPE.FIXED}>
        <FormFieldText
          register={register}
          label={'Descuento:'}
          formKey="discountAmount"
          errors={errors}
          symbol={'$'}
          labelRight
        />
      </RenderIf>
    </section>
  );
};
