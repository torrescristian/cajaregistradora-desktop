import { ICartItem, ICartState } from '@/interfaces/ICart';
import { IProduct } from '@/interfaces/IProduct';
import { create } from 'zustand';

interface IUpdatePriceProps {
  newPrice: number;
  product: IProduct;
}

const fixPrice = (price: number) => Math.round(price * 100) / 100;

// uso:
// const clientName = useCartStore(getClientName)
type ICartStore = ICartState & {
  initCart: (cartPayload: ICartState) => void;
  addProduct: (productPayload: IProduct) => void;
  removeProduct: (productPayload: IProduct) => void;
  removeCartItem: (productPayload: IProduct) => void;
  clearCart: () => void;
  updatePrice: (updatePriceProps: IUpdatePriceProps) => void;
  addClientId: (clientId: number) => void;
  clientId: number;
};

export const useCartStore = create<ICartStore>()((set) => ({
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  clientName: '',
  clientPhone: '',
  clientAddress: '',
  totalPrice: 0,
  additionalDetails: '',
  subtotalPrice: 0,
  clientId: 0,
  initCart: (cartPayload: ICartState) =>
    set({
      cartItems: cartPayload.cartItems,
      totalAmount: cartPayload.totalAmount,
      totalQuantity: cartPayload.totalQuantity,
    }),
  addProduct: (productPayload: IProduct) => {
    set((state): Partial<ICartStore> => {
      console.log('holis');
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.product.id === productPayload.id,
      );

      if (itemIndex >= 0) {
        const newCartItems = structuredClone(state.cartItems);
        const cartItem = newCartItems[itemIndex];

        if (
          !cartItem.product.isService &&
          cartItem.quantity >=
            productPayload.default_variant.stock_per_variant.stock
        ) {
          return state;
        }

        cartItem.quantity += 1;
        return {
          cartItems: newCartItems,
          totalAmount: fixPrice(
            state.totalAmount + productPayload.default_variant.price,
          ),
          totalQuantity: state.totalQuantity + 1,
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            product: productPayload,
            quantity: 1,
            selectedVariant: productPayload.default_variant,
          },
        ],
        totalAmount: fixPrice(
          state.totalAmount + productPayload.default_variant.price,
        ),
        totalQuantity: state.totalQuantity + 1,
      };
    });
  },
  removeProduct: (productPayload: IProduct) =>
    set((state) => {
      const item: ICartItem | undefined = state.cartItems.find(
        (item: ICartItem) => item.product.id === productPayload.id,
      );

      if (item?.quantity === 1) {
        return {
          cartItems: state.cartItems.filter(
            (item: ICartItem) => item.product.id !== productPayload.id,
          ),
          totalAmount: fixPrice(
            Math.max(
              state.totalAmount - productPayload.default_variant.price,
              0,
            ),
          ),
          totalQuantity: Math.max(state.totalQuantity - 1, 0),
          reset: true,
        };
      }
      if (item) {
        return {
          cartItems: state.cartItems.map((item: ICartItem) => {
            if (item.product.id === productPayload.id) {
              const newItem = structuredClone(item);
              newItem.quantity--;
              return newItem;
            }
            return item;
          }),
          totalAmount: fixPrice(
            Math.max(
              state.totalAmount - productPayload.default_variant.price,
              0,
            ),
          ),
          totalQuantity: Math.max(state.totalQuantity - 1, 0),
          reset: true,
        };
      }

      return state;
    }),
  removeCartItem: (productPayload: IProduct) =>
    set((state: any) => {
      const totalQuantity =
        state.totalQuantity -
        state.cartItems.reduce((acc: number, item: ICartItem) => {
          if (item.product.id === productPayload.id) {
            return acc + item.quantity;
          }
          return acc;
        }, 0);
      const totalAmount =
        state.totalAmount -
        state.cartItems.reduce((acc: number, item: ICartItem) => {
          if (item.product.id === productPayload.id) {
            return acc + item.product.default_variant.price * item.quantity;
          }
          return acc;
        }, 0);

      return {
        cartItems: state.cartItems.filter(
          (item: ICartItem) => item.product.id !== productPayload.id,
        ),
        totalAmount:
          Math.max(totalQuantity, 0) === 0
            ? 0
            : fixPrice(Math.max(totalAmount, 0)),
        totalQuantity: Math.max(totalQuantity, 0),
        reset: true,
      };
    }),
  clearCart: () =>
    set({
      cartItems: [],
      totalAmount: 0,
      totalQuantity: 0,
      reset: true,
    }),
  updatePrice: (updatePricePayload: IUpdatePriceProps) =>
    set((state: any) => {
      return structuredClone({
        cartItems: state.cartItems.map((item: ICartItem) => {
          if (item.product.id === updatePricePayload.product.id) {
            const newItem = structuredClone(item);
            newItem.product.default_variant.price = updatePricePayload.newPrice;
            return newItem;
          }
          return item;
        }),
      });
    }),
  addClientId: (clientId: number) => set({ clientId }),
}));

// selectors
export const getCartState = (state: ICartStore) => state;
export const getClientName = (state: ICartStore) => state.clientName;
export const getClientPhone = (state: ICartStore) => state.clientPhone;
export const getClientAddress = (state: ICartStore) => state.clientAddress;
export const getTotalPrice = (state: ICartStore) => state.totalPrice;
export const getCartItems = (state: ICartStore) => state.cartItems;
export const getTotalAmount = (state: ICartStore) => state.totalAmount;
export const getAdditionalDetails = (state: ICartStore) =>
  state.additionalDetails;
export const getTotalQuantity = (state: ICartStore) => state.totalQuantity;
export const getCartItemById = (id: number) => (state: ICartStore) =>
  state.cartItems.find((cartItem: ICartItem) => cartItem.product.id === id);
export const getCartItemQuantityByProductId =
  (id: number) => (state: ICartStore) => {
    return (
      state.cartItems.find((cartItem: ICartItem) => cartItem.product.id === id)
        ?.quantity || 0
    );
  };
export const getSubtotalPrice = (state: ICartStore) => state.subtotalPrice;
export const getClientId = (state: ICartStore) => state.clientId;
