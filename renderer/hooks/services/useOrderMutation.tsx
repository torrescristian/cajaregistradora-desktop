import { clearCart, useCartDispatch } from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';
import { IOrder, IOrderItem, ORDER_STATUS } from '@/interfaces/IOrder';
import IStockPerVariant, {
  IStockPerVariantPages,
} from '@/interfaces/IStockPerVariant';
import strapi from '@/libs/strapi';
import { useMutation } from '@tanstack/react-query';

interface IProps {
  items: ICartItem[];
  totalPrice: number;
  clientName: string;
  clientPhone: string;
  additionalDetails: string;
}

export default function useOrderMutation() {
  const dispatch = useCartDispatch();
  return useMutation(async (props: IProps) => {
    const resp = [null, null] as [any, any];
    resp[0] = await strapi.create('orders', parseOrderToPayLoad(props));

    const excludeServiceItem = (item: ICartItem): boolean =>
      !item.product.isService;

    const itemsToUpdate = props.items.filter(excludeServiceItem);

    if (itemsToUpdate.length) {
      resp[1] = await updateStock(itemsToUpdate);
    }

    dispatch(clearCart());

    return resp;
  });
}
//FIXME:
const clientId = 1;

function parseOrderToPayLoad({
  items,
  totalPrice,
  additionalDetails,
}: IProps): IOrder<number, IOrderItem<number, number>> {
  return {
    items: items.map((item): IOrderItem<number, number> => {
      return {
        product: item.product.id,
        quantity: item.quantity,
        price: item.selectedVariant.price,
        selectedVariant: item.selectedVariant.id,
      };
    }),
    additional_details: additionalDetails,
    total_price: totalPrice,
    client: clientId,
    status: ORDER_STATUS.PENDING,
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

  console.log(stockPerVariant);
  const updatedStockPerVariant = stockPerVariant.data.map(
    (spv): Pick<IStockPerVariant, 'id' | 'stock'> => {
      const item = items.find(
        (i) => spv.attributes.variant === i.selectedVariant.id,
      );

      if (!item)
        return {
          id: spv.id,
          stock: spv.attributes.stock,
        };
      return {
        id: spv.id,
        stock: spv.attributes.stock - item.quantity,
      };
    },
  );

  const promises = updatedStockPerVariant.map(async (spv) => {
    const { id } = spv;

    return await strapi.update('stock-per-variants', id!, {
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
