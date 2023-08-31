import { ICartState } from '@/interfaces/ICart';
import IProductUI from '@/interfaces/IProduct';
import { create } from 'zustand';

const fixPrice = (price: number) => Math.round(price * 100) / 100;

// uso:
// const clientName = useCartStore(getClientName)

export const useCartStore = create<ICartState>((set) => ({
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  clientName: '',
  clientPhone: '',
  clientAddress: '',
  totalPrice: 0,
  additionalDetails: '',
  initCart: (cartPayload: ICartState) =>
    set(() => {
      return {
        cartItems: cartPayload.cartItems,
        totalAmount: cartPayload.totalAmount,
        totalQuantity: cartPayload.totalQuantity,
      };
    }),
  addProduct: (productPayload: IProductUI) =>
    set((state: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.product.id === productPayload.id,
      );

      if (itemIndex >= 0) {
        const newCartItems = structuredClone(state.cartItems);
        const cartItem = newCartItems[itemIndex];

        if (
          !cartItem.product.isService &&
          cartItem.quantity >=
            productPayload.defaultVariant.stockPerVariant.stock
        ) {
          return state;
        }

        cartItem.quantity += 1;
        return {
          ...state,
          cartItems: newCartItems,
          totalAmount: fixPrice(
            state.totalAmount + productPayload.defaultVariant.price,
          ),
          totalQuantity: state.totalQuantity + 1,
        };
      }
    }),
}));

// selectors
export const getCartState = (state: ICartState) => state;
export const getClientName = (state: ICartState) => state.clientName;
export const getClientPhone = (state: ICartState) => state.clientPhone;
export const getClientAddress = (state: ICartState) => state.clientAddress;
export const getTotalPrice = (state: ICartState) => state.totalPrice;
export const getCartItems = (state: ICartState) => state.cartItems;
export const getTotalAmount = (state: ICartState) => state.totalAmount;
export const getAdditionalDetails = (state: ICartState) =>
  state.additionalDetails;
export const getTotalQuantity = (state: ICartState) => state.totalQuantity;
export const getCartItemById = (id: number) => (state: ICartState) =>
  state.cartItems.find((cartItem: ICartItem) => cartItem.product.id === id);
export const getCartItemQuantityByProductId =
  (id: number) => (state: ICartState) => {
    return (
      state.cartItems.find((cartItem: ICartItem) => cartItem.product.id === id)
        ?.quantity || 0
    );
  };
