import { PAYMENT_TYPE } from "@/interfaces/ITicket";
import { useState} from "react";
import { twMerge } from "tailwind-merge";
import { RenderIf } from "./RenderIf";

const paymentTypesAndLabels = [
  {
    type: PAYMENT_TYPE.CREDIT,
    label: "Crédito",
  },
  {
    type: PAYMENT_TYPE.CASH,
    label: "Efectivo",
  },
  {
    type: PAYMENT_TYPE.DEBIT,
    label: "Débito",
  },
] as const;

interface IProps {
  onChangeType: (selectedType: PAYMENT_TYPE) => void;
  register: any;
}



export const Payments = ({ onChangeType,register }: IProps) => {


  const [selectedPaymentType, setSelectedPaymentType] = useState(
    PAYMENT_TYPE.CASH
  );

  const handlePaymentSelect = (type: PAYMENT_TYPE) => () => {
    setSelectedPaymentType(type);
    onChangeType(type)
  };

  return (
    <section className="w-full flex-col flex">
      <section className="tabs tabs-boxed">
        {paymentTypesAndLabels.map(({ label, type }) => (
          <a key={type}
            className={twMerge(
              "tab",
              selectedPaymentType === type && "tab-active"
            )}
            onClick={handlePaymentSelect(type)}
          >
            {label}
          </a>
        ))}
      </section>
      <section>
        {paymentTypesAndLabels.map(({ label, type }) => (
          <RenderIf condition={selectedPaymentType === type} key={type}>
            <label className="label">
              {label}
              <input {...register(type)} type="number" placeholder="0.00" className="input input-bordered" />
            </label>
          </RenderIf>
        ))}
      </section>
    </section>
  );
};
