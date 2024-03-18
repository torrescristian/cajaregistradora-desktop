import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { RenderIf } from '../atoms/RenderIf';
import FormControl from './FormControl';
import FieldLabel from '../atoms/FieldLabel';

interface IProps {
  onChangeAmount: (value: string) => void;
  onChangeType: (value: DISCOUNT_TYPE) => void;
  discountType?: DISCOUNT_TYPE;
  discountAmount?: number | string;
}

export const DiscountTypeControl = ({
  onChangeAmount,
  onChangeType,
  discountAmount,
  discountType,
}: IProps) => {
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAmount(e.target.value);
  };
  const handleDiscountType = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeType(e.target.value as DISCOUNT_TYPE);
  };

  return (
    <section>
      <RenderIf condition={discountType === DISCOUNT_TYPE.PERC}>
        <FormControl
          text={'Descuento:'}
          name="discountAmount"
          type="text"
          value={discountAmount}
          onChange={handleChangeAmount}
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
          onChange={handleChangeAmount}
          fullWidth
          suffix="$"
        />
      </RenderIf>
      <section className="flex flex-row w-full">
        <FieldLabel
          title="Fijo $"
          className="label w-full border-2 hover:link p-3 border-stone-500"
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
          className="label border-2 whitespace-nowrap hover:link p-3  border-stone-500"
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
