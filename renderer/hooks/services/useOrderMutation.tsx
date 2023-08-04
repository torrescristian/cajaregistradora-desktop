import { clearCart, useCartDispatch } from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';
import { IOrder, ORDER_STATUS } from '@/interfaces/IOrder';
import IStockPerProduct, {
  IStockPerProductPages,
} from '@/interfaces/IStockPerProduct';
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
const clientId = 420;

throw new Error('create client ID');

function parseOrderToPayLoad({
  items,
  totalPrice,
  additionalDetails,
}: IProps): IOrder {
  return {
    items: items.map((item) => {
      return {
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
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

  const stockPerProduct = (await strapi.find('stock-per-products', {
    filters: {
      product: {
        id: productIds,
      },
    },
  })) as unknown as IStockPerProductPages;

  const updatedStockPerProduct = stockPerProduct.results.map(
    (spp): IStockPerProduct => {
      const item = items.find((i) => i.product.id === spp.product.id);

      if (!item) return spp;

      const { quantity } = item;

      if (spp.stock < quantity) {
        throw new Error(
          `No hay suficiente stock para el producto ${spp.product.name}`,
        );
      }

      return {
        stock: spp.stock - quantity,
      } as IStockPerProduct;
    },
  );

  const promises = updatedStockPerProduct.map(async (spp) => {
    const { id, stock } = spp;

    return await strapi.update('stock-per-products', id, {
      stock,
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

  return result
}
