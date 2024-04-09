import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import usePrintService from '@/modules/common/hooks/usePrintService';
import { calcDiscount } from '@/modules/common/libs/utils';
import {
  getCloseDrawer,
  useDrawerStore,
} from '@/modules/common/contexts/useDrawerStore';
import usePayments from '@/modules/ordenes/hooks/usePayments';
import { adaptCartItemToOrderItem } from '@/modules/ordenes/utils/utils';
import {
  useOrderStore,
  getHideProductCatalog,
  getOrderToUpdate,
  getIsCreateDelivery,
  getIsUpdateDelivery,
  getIsCreateTable,
  getIsUpdateTable,
} from '@/modules/common/contexts/useOrderStore';
import { getIsUpdateTakeAway } from '@/modules/common/contexts/useOrderStore';
import { getIsCreateTakeAway } from '@/modules/common/contexts/useOrderStore';
import { ORDENES_URL, ORDERS_KEY } from '@/modules/common/consts';

import {
  getAddClientId,
  getAdditionalDetails,
  getCartItems,
  getClearCart,
  getClientId,
  getDiscountAmount,
  getDiscountType,
  getPromoItems,
  getSetDiscountAmount,
  getSetDiscountType,
  getSubtotalPrice,
  getTotalPrice,
  useCartStore,
} from '../contexts/useCartStore';
import useUpdateOrderMutation from './useUpdateOrderMutation';
import useCreateOrderMutation from './useCreateOrderMutation';
import useCreateDeliveryMutation from './useCreateDeliveryMutation';
import { DELIVERY_STATUS } from '../interfaces/IDelivery';
import { useRouter } from 'next/router';
import {
  getCloseModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';
import useTakeTableOrderMutation from './useTakeTableOrderMutation';
import { is } from 'date-fns/locale';

const useCoupon = () => {
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [coupon, setCoupon] = useState<ICoupon>();

  const handleCouponDiscountAmount = ({
    couponDiscount,
    coupon,
  }: {
    couponDiscount: number;
    coupon: ICoupon;
  }) => {
    setCouponDiscount(couponDiscount || 0);
    setCoupon(coupon);
  };

  return {
    coupon,
    couponDiscount,
    handleCouponDiscountAmount,
  };
};

export default function useAdditionalDetailsOrder() {
  // cart state
  const additionalDetails = useCartStore(getAdditionalDetails);
  const totalPrice = useCartStore(getTotalPrice);
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const items = useCartStore(getCartItems);
  const addClientId = useCartStore(getAddClientId);
  const clientId = useCartStore(getClientId);
  const setDiscountType = useCartStore(getSetDiscountType);
  const setDiscountAmount = useCartStore(getSetDiscountAmount);
  const discountAmount = useCartStore(getDiscountAmount);
  const discountType = useCartStore(getDiscountType);
  const clearCart = useCartStore(getClearCart);
  const promoItems = useCartStore(getPromoItems);
  // order state
  const order = useOrderStore(getOrderToUpdate)!;
  const hideProductCatalog = useOrderStore(getHideProductCatalog);
  const isCreateTakeAway = useOrderStore(getIsCreateTakeAway);
  const isUpdateTakeAway = useOrderStore(getIsUpdateTakeAway);
  const isCreateDelivery = useOrderStore(getIsCreateDelivery);
  const isUpdateDelivery = useOrderStore(getIsUpdateDelivery);
  const isCreateTable = useOrderStore(getIsCreateTable);
  const isUpdateTable = useOrderStore(getIsUpdateTable);
  // mutations
  const orderMutation = useCreateOrderMutation();
  const updateOrderMutation = useUpdateOrderMutation();
  const deliveryMutation = useCreateDeliveryMutation();
  const takeTableOrderMutation = useTakeTableOrderMutation();

  const { coupon, couponDiscount, handleCouponDiscountAmount } = useCoupon();

  const newTotalPrice = calcDiscount({
    price: order?.totalPrice || totalPrice,
    discountAmount: couponDiscount,
    discountType: DISCOUNT_TYPE.FIXED,
  });

  const paymentProps = usePayments();

  const { printCommand } = usePrintService();

  const closeDrawer = useDrawerStore(getCloseDrawer);
  const closeModal = useModalStore(getCloseModal);

  const queryClient = useQueryClient();

  const router = useRouter();

  // handlers
  const createOrder = async () => {
    const { orderResponse } = await orderMutation.mutateAsync({
      additionalDetails,
      clientId,
      coupon,
      discount: { amount: Number(discountAmount!), type: discountType! },
      items,
      promoItems: promoItems!,
      subtotalPrice,
      totalPrice: newTotalPrice,
    });

    return orderResponse.data.id;
  };

  const createTakeAwayOrder = async () => {
    const orderId = await createOrder();
    await printCommand(orderId);
  };

  const updateTakeAwayOrder = async () => {
    const { orderResponse } = await updateOrderMutation.mutateAsync({
      order: {
        additionalDetails,
        client: clientId!,
        coupon,
        discount: { amount: Number(discountAmount!), type: discountType! },
        id: order!.id!,
        items: items.map(adaptCartItemToOrderItem),
        promoItems: promoItems!,
        status: order!.status,
        subtotalPrice,
        totalPrice: newTotalPrice,
      },
    });
    await printCommand(orderResponse.data.id);
  };

  const createDeliveryOrder = async () => {
    const { delivery } = useOrderStore.getState();

    if (!delivery) {
      toast.error('Falta cargar el cliente');
      return;
    }

    const orderId = await createOrder();
    await deliveryMutation.mutateAsync({
      ...delivery,
      order: orderId,
      client: delivery.client?.id || clientId || undefined,
      status: DELIVERY_STATUS.PENDING,
    });
  };

  const updateDeliveryOrder = async () => {
    const { delivery } = useOrderStore.getState();

    const { orderResponse } = await updateOrderMutation.mutateAsync({
      order: {
        additionalDetails,
        client: clientId!,
        coupon,
        discount: { amount: Number(discountAmount!), type: discountType! },
        id: order!.id!,
        items: items.map(adaptCartItemToOrderItem),
        promoItems: promoItems!,
        status: order!.status,
        subtotalPrice,
        totalPrice: newTotalPrice,
        delivery: {
          id: delivery?.id || order!.delivery?.id!,
          client: delivery?.client || order!.delivery?.client,
          userAddress: delivery?.userAddress || order!.delivery?.userAddress!,
          userName: delivery?.userName || order!.delivery?.userName!,
          userPhone: delivery?.userPhone || order!.delivery?.userPhone!,
          status: delivery?.status || order!.delivery?.status!,
        },
      },
    });
    await printCommand(orderResponse.data.id);
  };

  const createTableOrder = async () => {
    const orderId = await createOrder();
    await takeTableOrderMutation.mutateAsync({
      order: orderId,
      table: order.table!.id!,
    });

    await printCommand(orderId);
  };

  const updateTableOrder = async () => {
    const { orderResponse } = await updateOrderMutation.mutateAsync({
      order: {
        additionalDetails,
        client: clientId!,
        coupon,
        discount: { amount: Number(discountAmount!), type: discountType! },
        id: order!.id!,
        items: items.map(adaptCartItemToOrderItem),
        promoItems: promoItems!,
        status: order!.status,
        subtotalPrice,
        totalPrice: newTotalPrice,
      },
    });
    await printCommand(orderResponse.data.id);
  };

  const handleSubmit = async () => {
    switch (true) {
      case isCreateTakeAway: {
        await createTakeAwayOrder();
        break;
      }
      case isUpdateTakeAway: {
        await updateTakeAwayOrder();
        break;
      }
      case isCreateDelivery: {
        await createDeliveryOrder();
        break;
      }
      case isUpdateDelivery: {
        await updateDeliveryOrder();
        break;
      }
      case isCreateTable: {
        await createTableOrder();
        break;
      }
      case isUpdateTable: {
        await updateTableOrder();
        break;
      }
    }
    queryClient.invalidateQueries([ORDERS_KEY]);
    closeDrawer();
    closeModal();
    clearCart();
    hideProductCatalog();
    router.push(ORDENES_URL);
  };

  return {
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
  };
}
