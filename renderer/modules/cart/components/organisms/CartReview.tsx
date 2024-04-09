import {
  getCartItems,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import CartPromo from '@/modules/cart/components/molecules/CartPromo';
import CartItem from '@/modules/cart/components/molecules/CartItem';
import { Divider } from '@/modules/common/components/atoms/Divider';
import {
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';
import {
  getIsCreateDelivery,
  getIsCreateTable,
  getIsCreateTakeAway,
  getIsUpdateDelivery,
  getIsUpdateTable,
  getIsUpdateTakeAway,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';

import DeliveryFormModal from './DeliveryFormModal';
import useAdditionalDetailsOrder from '../../hooks/useAdditionalDetailsOrder';

const ActionButton = () => {
  const isUpdateTakeAway = useOrderStore(getIsUpdateTakeAway);
  const isCreateTakeAway = useOrderStore(getIsCreateTakeAway);
  const isUpdateDelivery = useOrderStore(getIsUpdateDelivery);
  const isCreateDelivery = useOrderStore(getIsCreateDelivery);
  const isCreateTable = useOrderStore(getIsCreateTable);
  const isUpdateTable = useOrderStore(getIsUpdateTable);
  const openModal = useModalStore(getOpenModal);
  const { handleSubmit } = useAdditionalDetailsOrder();

  const handleClickCreateDelivery = () => {
    openModal(<DeliveryFormModal onSubmit={handleSubmit} />);
  };

  if (isUpdateDelivery) {
    return (
      <button
        className="btn btn-success btn-outline w-full"
        onClick={handleClickCreateDelivery}
      >
        Actualizar Delivery
      </button>
    );
  }

  if (isUpdateTakeAway) {
    return (
      <button
        onClick={handleSubmit}
        className="btn btn-info btn-outline w-full"
      >
        Actualizar orden
      </button>
    );
  }

  if (isCreateTakeAway) {
    return (
      <button
        className="btn btn-success btn-outline w-full"
        onClick={handleSubmit}
      >
        Crear Orden
      </button>
    );
  }

  if (isCreateDelivery) {
    return (
      <button
        className="btn btn-success btn-outline w-full"
        onClick={handleClickCreateDelivery}
      >
        Crear Delivery
      </button>
    );
  }

  if (isCreateTable) {
    return (
      <button
        className="btn btn-success btn-outline w-full"
        onClick={handleSubmit}
      >
        Cargar orden en mesa
      </button>
    );
  }

  if (isUpdateTable) {
    return (
      <button
        className="btn btn-info btn-outline w-full"
        onClick={handleSubmit}
      >
        Actualizar orden en mesa
      </button>
    );
  }

  return null;
};

const CartReview = () => {
  const items = useCartStore(getCartItems);

  return (
    <section className="bg-base-100 flex min-w-[320px] flex-col items-center px-4">
      <Divider>Carrito</Divider>
      <ActionButton />
      <Divider />
      <div className="flex flex-col gap-4 overflow-y-scroll">
        {items.map((item) => (
          <CartItem
            key={item.selectedVariant.id}
            product={item.product}
            variant={item.selectedVariant}
          />
        ))}
        <CartPromo />
      </div>
    </section>
  );
};

export default CartReview;
