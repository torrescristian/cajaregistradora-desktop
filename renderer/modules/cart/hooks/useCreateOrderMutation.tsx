import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';

import {
  IDiscount,
  IOrder,
  IOrderItem,
  ORDER_STATUS,
} from '@/modules/ordenes/interfaces/IOrder';
import strapi from '@/modules/common/libs/strapi';
import {
  getClearCart,
  getPromoItems,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import { IStrapiSingleResponse } from '@/modules/common/interfaces/utils';
import { parsePromoItemsToCartItems } from '@/modules/common/libs/utils';
import {
  PRODUCTS_KEY,
  STOCK_PER_VARIANTS_KEY,
  ORDERS_KEY,
} from '@/modules/common/consts';

import { ICartItem, IPromoItem } from '../interfaces/ICart';

interface IProps {
  items: ICartItem[];
  totalPrice: number;
  additionalDetails: string;
  clientId?: number | null;
  subtotalPrice: number;
  discount?: IDiscount;
  coupon?: ICoupon;
  promoItems?: IPromoItem[];
}

export default function useCreateOrderMutation(
  { onSuccess } = {
    onSuccess: () => toast.success('Orden creada con exito'),
  },
) {
  const queryClient = useQueryClient();
  const clearCart = useCartStore(getClearCart);
  const promoItems = useCartStore(getPromoItems);

  return useMutation(
    async (props: IProps) => {
      const resp = [null, null, null] as [any, any, any];
      try {
        resp[0] = await strapi.create(ORDERS_KEY, parseOrderToPayLoad(props));

        const excludeServiceItem = (item: ICartItem): boolean =>
          !item.product.isService;

        const itemsToUpdate = props.items.filter(excludeServiceItem);
        if (itemsToUpdate.length) {
          resp[1] = await updateStock(itemsToUpdate);
        }
        if (promoItems.length) {
          resp[2] = await updateStock(parsePromoItemsToCartItems(promoItems));
        }
        queryClient.invalidateQueries([ORDERS_KEY]);
        queryClient.invalidateQueries([PRODUCTS_KEY]);
        queryClient.invalidateQueries([STOCK_PER_VARIANTS_KEY]);
        clearCart();
      } catch (error) {
        toast.error('Error al crear orden');
      }
      return {
        orderResponse: resp[0] as IStrapiSingleResponse<IOrder>,
        productsStockUpdateResponse: resp[1],
        promosStockUpdateResponse: resp[2],
      };
    },
    { onSuccess },
  );
}

function parseOrderToPayLoad({
  items,
  totalPrice,
  additionalDetails,
  clientId,
  subtotalPrice,
  discount,
  coupon,
  promoItems,
}: IProps): IOrder<number | undefined, IOrderItem<number, number>, number> {
  return {
    items: items.map((item): IOrderItem<number, number> => {
      return {
        product: item.product.id,
        quantity: item.quantity,
        price: item.selectedVariant.price,
        selectedVariant: item.selectedVariant.id!,
      };
    }),
    additionalDetails: additionalDetails,
    totalPrice: totalPrice,
    client: clientId || undefined,
    status: ORDER_STATUS.PENDING,
    subtotalPrice: subtotalPrice,
    discount: discount,
    coupon: coupon?.id!,
    promoItems: promoItems!,
  };
}

async function updateStock(items: ICartItem[]) {
  const promises = items.map((item) => {
    if (!item.selectedVariant.id) {
      throw new Error('No se encontro el id');
    }

    if (item.product.isService) {
      return;
    }
    const { stock, id } = item.selectedVariant.stock_per_variant!;
    yup.number().integer().required().validate(stock);
    yup.number().required().validate(id);
    return strapi.update('stock-per-variants', id!, {
      stock: stock - item.quantity,
    });
  });

  const result = await Promise.allSettled(promises);

  if (
    result.some((r) => {
      return r.status === 'rejected';
    })
  ) {
    throw new Error('Error al actualizar el stock');
  }
}
