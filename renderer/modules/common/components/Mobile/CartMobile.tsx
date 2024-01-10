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
import { ConfirmOrderMobile } from '../../../cart/components/ConfirmOrderMobile';
import { ButtonClose } from '../ButtonClose';

const ProductContainer = ({ children }: IComponent) => (
  <section className="flex flex-col w-full gap-5 justify-between z-50">
    {children}
  </section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-full flex-col items-center gap-5 p-3 h-screen z-50 ">
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
  closeUpdateMode: () => void;
}

const CartMobile = ({
  updateMode,
  order,
  onSubmit,
  closeUpdateMode,
}: IProps) => {
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
        <Card className="flex flex-col items-center text-base-content gap-3 w-full">
          <p className="flex text-center text-xl gap-5">
            <span className="opacity-60">Total:</span>
            <span>{formatPrice(subtotalPrice)}</span>
          </p>
          <div className="flex flex-row items-center">
            <ButtonClose onClick={() => closeModal()} label="cerrar" />
            <RenderIf condition={items.length || promosItems.length}>
              <button
                className="btn btn-primary"
                onClick={() =>
                  openModal(
                    <ConfirmOrderMobile
                      closeUpdateMode={closeUpdateMode}
                      updateMode={updateMode}
                      order={order}
                      onSubmit={onSubmit}
                      promoItems={promosItems}
                    />,
                  )
                }
              >
                Pasar Orden
              </button>
            </RenderIf>
          </div>
        </Card>
      </ProductContainer>
    </Layout>
  );
};

export default CartMobile;
