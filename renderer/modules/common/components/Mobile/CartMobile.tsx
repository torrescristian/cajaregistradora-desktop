import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import { formatPrice } from '@/modules/common/libs/utils';
import {
  getCartItems,
  getPromoItems,
  getSubtotalPrice,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { Card } from '@/modules/common/components/Card';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import CartPromo from '../../../cart/components/CartPromo';
import { Divider } from '../../../cart/components/Sale/Sale.styles';
import { ICartItem } from '../../../cart/interfaces/ICart';
import CartItemMobile from './CartItemMobile';
import { useModalStore } from '@/modules/common/contexts/useModalStore';
import { ConfirmOrderMobile } from './ConfirmOrderMobile';

const ProductContainer = ({ children }: IComponent) => (
  <section className="flex flex-col w-full gap-5 justify-between ">
    {children}
  </section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-full flex-col items-center gap-5 p-3 h-screen ">
    <Divider>Carrito</Divider>
    {children}
    <section>
      {totalAmount ? (
        <p className="text-2xl">
          <span className="text-base">Total:</span> {formatPrice(totalAmount)}
        </p>
      ) : (
        ''
      )}
    </section>
  </section>
);

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
}

const CartMobile = ({ updateMode, order, onSubmit }: IProps) => {
  const items = useCartStore(getCartItems) as ICartItem[];
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const promosItems = useCartStore(getPromoItems);

  const { openModal, closeModal } = useModalStore();
  if (updateMode && !order) {
    throw new Error('Missing order to update');
  }

  return (
    <Layout>
      <ProductContainer>
        <div className="flex flex-col gap-3 overflow-y-scroll h-[70vh]">
          {items.map((item) => (
            <CartItemMobile
              key={item.selectedVariant.id}
              product={item.product}
              variant={item.selectedVariant}
            />
          ))}
          <CartPromo promosItems={promosItems} />
        </div>
        <Card className="flex flex-row w-full">
          <p className="text-center">
            <span className="text-xl text-primary">Total:</span>{' '}
            {formatPrice(subtotalPrice)}
          </p>
          <RenderIf condition={items.length || promosItems.length}>
            <div className="flex flex-row gap-3 w-full justify-end">
              <button
                className="btn btn-primary"
                onClick={() => openModal(<ConfirmOrderMobile />)}
              >
                Pasar Orden
              </button>
              {updateMode ? (
                <button className="btn btn-error" onClick={onSubmit}>
                  Cancelar
                </button>
              ) : null}
            </div>
          </RenderIf>
          <RenderIf condition={!items.length && !promosItems.length}>
            <section className="bg-info text-primary-content p-4 w-full">
              No hay productos en el carrito
            </section>
          </RenderIf>
        </Card>
        <label
          htmlFor="carrito-drawer"
          aria-label="cerrar sidebar"
          className="btn btn-error"
          onClick={() => closeModal()}
        >
          Salir
        </label>
      </ProductContainer>
    </Layout>
  );
};

export default CartMobile;
