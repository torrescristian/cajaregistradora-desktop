import ClientForm from './ClientForm';
import Loader from '@/modules/common/components/Loader';
import {
  IOrder,
} from '@/modules/ordenes/interfaces/IOrder';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import ValidateCoupon from '@/modules/ordenes/components/ValidateCoupon';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';
import 'react-toastify/dist/ReactToastify.css';
import Payments from '@/modules/ordenes/components/Payments';
import CustomToastContainer from '@/modules/common/components/CustomToastContainer';
import useConfirmOrder from '../hooks/useConfirmOrder';
import { IPromoItem } from '../interfaces/ICart';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  promoItems?: IPromoItem[];
  closeUpdateMode?: () => void;
}

export const ConfirmOrderMobile = ({
  updateMode,
  order,
  onSubmit,
  promoItems,
  closeUpdateMode,
}: IProps) => {
  const {
    orderMutation,
    addClientId,
    additionalDetails,
    handleChangeAdditionalsDetails,
    handleChangeDiscountType,
    handleCouponDiscountAmount,
    subtotalPrice,
    coupon,
    newTotalPrice,
    handleChangePayments,
    handleSubmit,
    handleCreateTicket,
    closeModal,
  } = useConfirmOrder({ onSubmit, order, promoItems, updateMode, closeUpdateMode });

  if (orderMutation.isLoading) {
    return <Loader />;
  }

  return (
    <section className="p-5 bg-base-100 text-base-content ">
      <CustomToastContainer />
      <section className="flex flex-col items-center">
        <ClientForm
          onSelect={(client) => addClientId(client?.id || null)}
          defaultClient={order?.client}
        />

        <div className="flex flex-col gap-5 " >
          <label className="label">Detalles adicionales:</label>
          <textarea
            className="textarea textarea-bordered"
            value={additionalDetails}
            onChange={handleChangeAdditionalsDetails}
          />
          <DiscountTypeControl
            onChange={handleChangeDiscountType}
            discountAmount={order?.discount?.amount}
            discountType={order?.discount?.type}
          />
          <ValidateCoupon
            onChange={handleCouponDiscountAmount}
            subtotalPrice={order?.subtotalPrice! || subtotalPrice}
            coupon={coupon}
          />
          <Payments
            newTotalPrice={newTotalPrice}
            onChange={handleChangePayments}
          />
          <DataItem
            label="Total:"
            value={formatPrice(newTotalPrice)}
            defaultValue=""
            className="text-2xl"
          />
        </div>
      </section>
      <div className="flex flex-col w-full items-center gap-5 pt-5">
        <button
          onClick={handleSubmit}
          className="btn w-full sticky top-0 z-20  whitespace-nowrap btn-primary text-xl text-primary-content"
        >
          {updateMode ? 'Actualizar orden' : 'Crear orden pendiente'}
        </button>
        {updateMode ? null : (
          <button className="btn btn-secondary w-full" onClick={handleCreateTicket}>
            Finalizar venta
          </button>
        )}
        <button
          className="btn btn-link text-error"
          onClick={() => closeModal()}
        >
          Cancelar
        </button>
      </div>
    </section>
  );
};
