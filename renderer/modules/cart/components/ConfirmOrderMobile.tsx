import ClientForm from './ClientForm';
import Loader from '@/modules/common/components/Loader';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import ValidateCoupon from '@/modules/ordenes/components/ValidateCoupon';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';
import 'react-toastify/dist/ReactToastify.css';
import Payments from '@/modules/ordenes/components/Payments';
import CustomToastContainer from '@/modules/common/components/CustomToastContainer';
import useConfirmOrder from '../hooks/useConfirmOrder';
import { IPromoItem } from '../interfaces/ICart';
import { ButtonClose } from '@/modules/common/components/ButtonClose';
import { Divider } from './Sale/Sale.styles';

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
    addClientId,
    additionalDetails,
    closeModal,
    coupon,
    discountAmount,
    discountType,
    handleChangeAdditionalsDetails,
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleCouponDiscountAmount,
    handleCreateTicket,
    handleDeletePayment,
    handleSubmit,
    newTotalPrice,
    orderMutation,
    payments,
    setDiscountAmount,
    setDiscountType,
    subtotalPrice,
  } = useConfirmOrder({
    onSubmit,
    order,
    promoItems,
    updateMode,
    closeUpdateMode,
  });

  if (orderMutation.isLoading) {
    return <Loader />;
  }

  return (
    <section className="p-5 bg-base-100 text-base-content ">
      <ClientForm
        onSelect={(client) => addClientId(client?.id || null)}
        defaultClient={order?.client}
      />
      <CustomToastContainer />
      <section className="flex flex-col items-center">
        <div className="flex flex-col gap-5 ">
          <Divider className="mt-10 mb-5">Detalles adicionales</Divider>
          <input
            className="input input-bordered"
            value={additionalDetails}
            onChange={handleChangeAdditionalsDetails}
          />
          <DiscountTypeControl
            onChangeAmount={setDiscountAmount}
            onChangeType={setDiscountType}
            discountAmount={discountAmount}
            discountType={discountType}
          />
          <ValidateCoupon
            onChange={handleCouponDiscountAmount}
            subtotalPrice={order?.subtotalPrice! || subtotalPrice}
            coupon={coupon}
          />
          <Payments
            newTotalPrice={newTotalPrice}
            payments={payments}
            onChange={handleChangePayment}
            onDelete={handleDeletePayment}
            onNewPayment={handleClickAddPaymentMethod}
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
        {updateMode ? (
          <button
            onClick={handleSubmit}
            className="btn w-full sticky top-0 z-20  whitespace-nowrap btn-primary text-xl text-primary-content"
          >
            Actualizar orden
          </button>
        ) : null}
        {updateMode ? null : (
          <div>
            <button className="btn btn-warning btn-outline w-full" onClick={handleSubmit}>
              Crear Orden
            </button>
            <button
              className="btn btn-error btn-outline w-full"
              onClick={handleCreateTicket}
            >
              Finalizar venta
            </button>
          </div>
        )}
        <ButtonClose
          label="Cerrar"
          className="self-right"
          onClick={() => closeModal()}
        />
      </div>
    </section>
  );
};
