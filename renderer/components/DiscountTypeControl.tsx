import { useEffect, useState } from "react";
import FormFieldText from "./FormFieldText"
import { DISCOUNT_TYPE } from "@/interfaces/IOrder";
import { RenderIf } from "./RenderIf";

interface IProps {
    register: any;
    errors: any;
    onChange: (discountType: DISCOUNT_TYPE) => void;
}


export const DiscountTypeControl = ({ register, errors, onChange }: IProps) => {

    const [radioSelect, setRadioSelect] = useState(DISCOUNT_TYPE.FIXED);
    const handleRadioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioSelect(e.target.value as DISCOUNT_TYPE);
    }

    useEffect(() => {
        onChange(radioSelect);
    },[radioSelect]
    )
    return (
        <section>
            <section className="grid grid-cols-2 w-full">
                <label className='label border-2 hover:link p-3 border-stone-500'>
                    <input type="radio" name="radio-1" className="radio" onChange={handleRadioSelect} value={DISCOUNT_TYPE.FIXED} />
                    Fijo $
                </label>
                <label className='label border-2  hover:link p-3  border-stone-500'>
                    <input type="radio" name="radio-1" value={DISCOUNT_TYPE.PERC} className="radio"
                        onChange={handleRadioSelect}
                        checked={radioSelect === DISCOUNT_TYPE.PERC}
                    />
                    Porcentaje %
                </label>
            </section>
            <RenderIf condition={radioSelect === DISCOUNT_TYPE.PERC}>
                <FormFieldText
                    register={register}
                    label={'Descuento:'}
                    formKey="discountAmount"
                    errors={errors}
                    symbol={'%'}
                />
            </RenderIf>
            <RenderIf condition={radioSelect === DISCOUNT_TYPE.FIXED}>
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
    )
}