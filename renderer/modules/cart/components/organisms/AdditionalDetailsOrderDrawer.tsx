import 'react-toastify/dist/ReactToastify.css';

import Loader from '@/modules/common/components/atoms/Loader';
import { DiscountTypeControl } from '@/modules/common/components/molecules/DiscountTypeControl';
import ValidateCoupon from '@/modules/ordenes/components/molecules/ValidateCoupon';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/atoms/DataItem';
import Payments from '@/modules/ordenes/components/molecules/Payments';
import CustomToastContainer from '@/modules/common/components/molecules/CustomToastContainer';
import {
  getIsCreateDelivery,
  getIsCreateTable,
  getIsCreateTakeAway,
  getIsOrderBeingUpdated,
  getOrderToUpdate,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import {
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';

import ClientForm from './ClientForm';
import useAdditionalDetailsOrder from '../../hooks/useAdditionalDetailsOrder';
import DeliveryFormModal from './DeliveryFormModal';

interface IActionButton {
  onSubmit: () => void;
  isLoading: boolean;
}

const ActionButton = ({ onSubmit, isLoading }: IActionButton) => {
  const isOrderUpdate = useOrderStore(getIsOrderBeingUpdated);
  const isCreateTakeAway = useOrderStore(getIsCreateTakeAway);
  const isCreateDelivery = useOrderStore(getIsCreateDelivery);
  const isCreateTable = useOrderStore(getIsCreateTable);
  const openModal = useModalStore(getOpenModal);

  const handleClickCreateDelivery = () => {
    openModal(<DeliveryFormModal onSubmit={onSubmit} />);
  };

  if (isLoading) {
    return <div className="skeleton w-full h-12"></div>;
  }

  switch (true) {
    case isOrderUpdate: {
      return (
        <button onClick={onSubmit} className="btn btn-info btn-outline w-full">
          Actualizar orden
        </button>
      );
    }
    case isCreateTakeAway: {
      return (
        <button
          className="btn btn-success btn-outline w-full"
          onClick={onSubmit}
        >
          Crear Orden
        </button>
      );
    }
    case isCreateDelivery: {
      return (
        <button
          className="btn btn-success btn-outline w-full"
          onClick={handleClickCreateDelivery}
        >
          Crear Delivery
        </button>
      );
    }
    case isCreateTable: {
      return (
        <button
          className="btn btn-success btn-outline w-full"
          onClick={onSubmit}
        >
          Cargar orden en mesa
        </button>
      );
    }
  }

  return null;
};

export const AdditionalDetailsOrderDrawer = () => {
  const {
    addClientId,
    coupon,
    deliveryMutation,
    discountAmount,
    discountType,
    handleCouponDiscountAmount,
    handleSubmit,
    orderMutation,
    paymentProps,
    setDiscountAmount,
    setDiscountType,
    subtotalPrice,
    updateOrderMutation,
  } = useAdditionalDetailsOrder();

  const order = useOrderStore(getOrderToUpdate)!;

  if (orderMutation.isLoading) {
    return <Loader />;
  }

  return (
    <section className="p-5 bg-base-100 text-base-content h-screen">
      <div className="flex flex-col w-full items-center whitespace-nowrap gap-5 pt-5">
        <ActionButton
          onSubmit={handleSubmit}
          isLoading={
            orderMutation.isLoading ||
            deliveryMutation.isLoading ||
            updateOrderMutation.isLoading
          }
        />
        <DataItem
          label="Total:"
          value={formatPrice(subtotalPrice)}
          defaultValue=""
          className="text-2xl flex flex-row"
        />
      </div>
      <ClientForm
        onSelect={(client) => addClientId(client?.id || null)}
        defaultClient={order?.client}
      />
      <CustomToastContainer />
      <section className="flex flex-col items-center">
        <div className="flex flex-col gap-5 ">
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
          <Payments {...paymentProps} />
        </div>
      </section>
    </section>
  );
};
