import ClientForm from './ClientForm';
import Loader from '@/modules/common/components/Loader';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import ValidateCoupon from '@/modules/ordenes/components/ValidateCoupon';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';
import 'react-toastify/dist/ReactToastify.css';
import Payments from '@/modules/ordenes/components/Payments';
import { IPromoItem } from '../interfaces/ICart';
import useConfirmOrder from '../hooks/useConfirmOrder';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  promoItems?: IPromoItem[];
}

export const ConfirmOrder = ({
  updateMode,
  order,
  onSubmit,
  promoItems,
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
    handleClickConfirmOrder,
    items,
    ref,
  } = useConfirmOrder({ onSubmit, order, promoItems, updateMode });

  if (orderMutation.isLoading) {
    return <Loader />;
  }

  if (orderMutation.isSuccess) {
    return (
      <div className="p-10 toast toast-top toast-end">
        <div className="alert alert-success">
          <span className="text-text-base-content text-xl">
            Pedido agregado 🎉
          </span>
        </div>
      </div>
    );
  }
  return (
    <section>
      <div className="flex flex-row gap-3 w-full">
        <button
          className="btn btn-primary"
          onClick={handleClickConfirmOrder}
          disabled={!items.length && !promoItems!.length}
        >
          Pasar Orden
        </button>
        {updateMode ? (
          <button className="btn btn-error" onClick={onSubmit}>
            Cancelar
          </button>
        ) : null}
      </div>
      <dialog ref={ref} className="border-4 rounded-3xl py-5 px-10">
        <section className="flex flex-col sm:flex-row items-center sm:gap-10">
          <ClientForm
            onSelect={(client) => addClientId(client?.id || null)}
            defaultClient={order?.client}
          />

          <div className="flex flex-col gap-5">
            <label className="label">Detalles adicionales:</label>
            <textarea
              className="textarea textarea-bordered h-36"
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
        <div className="flex flex-col sm:flex-row justify-between pt-5">
          <button
            className="btn btn-link text-error"
            onClick={() => ref.current?.close()}
          >
            Cancelar
          </button>

          <button className="btn btn-link" onClick={handleCreateTicket}>
            Finalizar venta
          </button>
          <button
            onClick={handleSubmit}
            className="btn sticky top-0 z-20 sm:w-fit whitespace-nowrap btn-primary text-xl text-primary-content"
          >
            {updateMode ? 'Actualizar orden' : 'Crear orden pendiente'}
          </button>
        </div>
      </dialog>
    </section>
  );
};
