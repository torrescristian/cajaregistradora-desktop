import strapi from '@/libs/strapi';
import { clearCart, useCartDispatch } from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';
import { ISaleItem, ISale, ISaleNativeResponse } from '@/interfaces/ISale';
import { useMutation } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import IStockPerVariant, {
  IStockPerVariantPages,
} from '@/interfaces/IStockPerVariant';

interface IProps {
  items: ICartItem[];
  totalAmount: number;
}

export default function useSalesMutation() {
  const dispatch = useCartDispatch();

  return useMutation(async (props: IProps) => {
    const res = [null, null] as [ISaleNativeResponse | null, any];

    res[0] = (await strapi.create(
      'sales',
      parseSaleToPayload(props),
    )) as ISaleNativeResponse;

    const excludeServiceItem = (item: ICartItem): boolean =>
      !item.product.isService;

    const itemsToUpdate = props.items.filter(excludeServiceItem);

    if (itemsToUpdate.length) {
      res[1] = await updateStock(itemsToUpdate);
    }

    const socket = io('http://localhost:4000');

    const {
      id,
      attributes: { createdAt, updatedAt },
    } = res[0]!.data;

    if (socket) {
      socket.emit('print', {
        items: props.items,
        totalAmount: props.totalAmount,
        id,
        createdAt,
        updatedAt,
      });
    }

    dispatch(clearCart());

    return res;
  });
}

function parseSaleToPayload({ items, totalAmount }: IProps): ISale {
  const sale_items = items.map(
    (item): ISaleItem => ({
      product: item.product.id,
      price: item.selectedVariant.price,
      quantity: item.quantity,
    }),
  );

  return {
    total_price: totalAmount,
    sale_items,
  };
}

async function updateStock(items: ICartItem[]) {
  const productIds = items.map((item) => item.product.id);

  const stockPerVariant = (await strapi.find('stock-per-variants', {
    filters: {
      product: {
        id: productIds,
      },
    },
  })) as unknown as IStockPerVariantPages;

  const updatedStockPerVariant = stockPerVariant.results.map(
    (spv): IStockPerVariant => {
      const item = items.find((i) => spv.variant === i.selectedVariant.id);

      if (!item) return spv;

      const { quantity } = item;

      return {
        ...spv,
      } as IStockPerVariant;
    },
  );

  const promises = updatedStockPerVariant.map(async (spv) => {
    const { id } = spv;

    return await strapi.update('stock-per-variants', id, {
      stock: spv.stock,
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
