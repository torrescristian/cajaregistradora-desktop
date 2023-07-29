import strapi from '@/libs/strapi';
import { clearCart, useCartDispatch } from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';
import { ISaleItem, ISale } from '@/interfaces/ISale';
import IStockPerProduct, {
  IStockPerProductPages,
} from '@/interfaces/IStockPerProduct';
import { useMutation } from '@tanstack/react-query';

interface IProps {
  items: ICartItem[];
  totalAmount: number;
}

export default function useSalesMutation() {
  const dispatch = useCartDispatch();

  return useMutation(async (props: IProps) => {
    const res = [null, null] as [any, any];

    res[0] = await strapi.create('sales', parseSaleToPayload(props));

    const excludeServiceItem = (item: ICartItem): boolean =>
      !item.product.isService;

    const itemsToUpdate = props.items.filter(excludeServiceItem);

    if (itemsToUpdate.length) {
      res[1] = await updateStock(itemsToUpdate);
    }

    dispatch(clearCart());

    return res;
  });
}

function parseSaleToPayload({ items, totalAmount }: IProps): ISale {
  const sale_items = items.map(
    (item): ISaleItem => ({
      product: item.product.id,
      price: item.product.price,
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

      return {
        ...spp,
        sales_amount_per_product: spp.sales_amount_per_product + quantity,
      } as IStockPerProduct;
    },
  );

  const promises = updatedStockPerProduct.map(async (spp) => {
    const { id } = spp;

    return await strapi.update('stock-per-products', id, {
      sales_amount_per_product: spp.sales_amount_per_product,
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
