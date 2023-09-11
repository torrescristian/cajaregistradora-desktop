import { IComponent } from '@/interfaces/ProductItem.interfaces';
import { formatPrice } from '@/libs/utils';
import { ICartItem } from '@/interfaces/ICart';
import CartItem from './CartItem';
import {
  getCartItems,
  getTotalAmount,
  useCartStore,
} from '@/contexts/CartStore';
import { ConfirmOrder } from './ConfirmOrder';
import { Card } from './Card';
import { IOrder } from '@/interfaces/IOrder';


const ProductContainer = ({ children }: IComponent) => (
  <section className="flex flex-row w-full gap-5 justify-between">
    {children}
  </section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-full flex-col items-center gap-5">
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
  updateMode: boolean;
  order?:IOrder;
}

const Cart = ({updateMode,order}: IProps) => {
  const items = useCartStore(getCartItems) as ICartItem[];
  const totalAmount = useCartStore(getTotalAmount);

  if (updateMode && !order){
    throw new Error('Missing order to update');
  
  }


  return (
    <Layout>
      <ProductContainer>
        <div className="flex flex-row gap-3 overflow-x-scroll">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              variant={item.selectedVariant}
            />
          ))}
        </div>
        <Card>
          <section className="p-5">
            <p className="text-2xl text-primary-content">
              <span className="text-xl text-secondary">Total:</span>{' '}
              {formatPrice(totalAmount)}
            </p>
          </section>
          <section className="w-max">
            {items.length ? 
                <ConfirmOrder updateMode order={order}/>
                 : (
                  <section className="bg-info text-primary-content p-4 w-full">
                No hay productos en el carrito
              </section>
            )
          }
          </section>
          </Card>
      </ProductContainer>
    </Layout>
  );
};

export default Cart;
