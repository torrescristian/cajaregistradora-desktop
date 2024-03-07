import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import { formatPrice } from '@/modules/common/libs/utils';
import {
  getCartItems,
  getPromoItems,
  getSubtotalPrice,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { Card } from '@/modules/common/components/Card';
import { RenderIf } from '@/modules/common/components/RenderIf';
import CartPromo from '../../../cart/components/CartPromo';
import { Divider } from '../../../cart/components/Sale/Sale.styles';
import { ICartItem } from '../../../cart/interfaces/ICart';
import CartItem from './CartItem';
import { useDrawerStore } from '@/modules/common/contexts/useDrawerStore';
import { ConfirmOrder } from '../../../cart/components/ConfirmOrder';
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
  onSubmit?: () => void;
  closeUpdateMode: () => void;
}

const CartContainer = ({ onSubmit, closeUpdateMode }: IProps) => {
  const items = useCartStore(getCartItems) as ICartItem[];
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const promosItems = useCartStore(getPromoItems);

  const { openDrawer, closeDrawer: closeModal } = useDrawerStore();

  return (
    <Layout>
      <ProductContainer>
        <div className="flex flex-col gap-3 overflow-y-scroll h-[70vh]">
          {items.map((item) => (
            <CartItem
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
                  openDrawer(
                    <ConfirmOrder
                      closeUpdateMode={closeUpdateMode}
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

export default CartContainer;
