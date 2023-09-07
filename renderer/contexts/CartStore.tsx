import { ICartItem, ICartState } from '@/interfaces/ICart';
import { IProduct, IVariant } from '@/interfaces/IProduct';
import { create } from 'zustand';

interface IAddProductProps {
  product: IProduct;
  selectedVariant: IVariant;
}

const fixPrice = (price: number) => Math.round(price * 100) / 100;

// uso:
// const clientName = useCartStore(getClientName)
type ICartStore = ICartState & {
  initCart: (cartPayload: ICartState) => void;
  addProduct: ({ product, selectedVariant }: IAddProductProps) => void;
  removeProduct: ({ product, selectedVariant }: IAddProductProps) => void;
  removeCartItem: ({ product, selectedVariant }: IAddProductProps) => void;
  clearCart: () => void;
  addClientId: (clientId: number | null) => void;
  clientId: number | null;
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
  addProduct: ({ product, selectedVariant }: IAddProductProps) => {
    set((state): Partial<ICartStore> => {
      console.log('holis');
      const itemIndex = state.cartItems.findIndex(
        (item) => item.selectedVariant.id! === selectedVariant.id!,
      );

      if (itemIndex >= 0) {
        const newCartItems = structuredClone(state.cartItems);
        const cartItem = newCartItems[itemIndex];

        if (
          !cartItem.product.isService &&
          cartItem.quantity >= selectedVariant.stock_per_variant.stock
        ) {
          return state;
        }

        cartItem.quantity += 1;
        return {
          cartItems: newCartItems,
          totalAmount: fixPrice(state.totalAmount + selectedVariant.price),
          totalQuantity: state.totalQuantity + 1,
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            product: product,
            quantity: 1,
            selectedVariant: selectedVariant,
          },
        ],
        totalAmount: fixPrice(state.totalAmount + selectedVariant.price),
        totalQuantity: state.totalQuantity + 1,
      };
    });
  },
  removeProduct: ({ selectedVariant }: IAddProductProps) =>
    set((state) => {
      const item: ICartItem | undefined = state.cartItems.find(
        (item) => item.selectedVariant.id! === selectedVariant.id!,
      );

      if (item?.quantity === 1) {
        return {
          cartItems: state.cartItems.filter(
            (item: ICartItem) =>
              item.selectedVariant.id! !== selectedVariant.id!,
          ),
          totalAmount: fixPrice(
            Math.max(state.totalAmount - selectedVariant.price, 0),
          ),
          totalQuantity: Math.max(state.totalQuantity - 1, 0),
          reset: true,
        };
      }
      if (item) {
        return {
          cartItems: state.cartItems.map((item: ICartItem) => {
            if (item.selectedVariant.id! === selectedVariant.id!) {
              const newItem = structuredClone(item);
              newItem.quantity--;
              return newItem;
            }
            return item;
          }),
          totalAmount: fixPrice(
            Math.max(state.totalAmount - selectedVariant.price, 0),
          ),
          totalQuantity: Math.max(state.totalQuantity - 1, 0),
          reset: true,
        };
      }

      return state;
    }),
  removeCartItem: ({ selectedVariant }: IAddProductProps) =>
    set((state: any) => {
      const totalQuantity =
        state.totalQuantity -
        state.cartItems.reduce((acc: number, item: ICartItem) => {
          if (item.selectedVariant.id! === selectedVariant.id!) {
            return acc + item.quantity;
          }
          return acc;
        }, 0);
      const totalAmount =
        state.totalAmount -
        state.cartItems.reduce((acc: number, item: ICartItem) => {
          if (item.selectedVariant.id! === selectedVariant.id!) {
            return acc + item.selectedVariant.price * item.quantity;
          }
          return acc;
        }, 0);

      return {
        cartItems: state.cartItems.filter(
          (item: ICartItem) => item.selectedVariant.id! !== selectedVariant.id!,
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
  addClientId: (clientId: number | null) => set({ clientId }),
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
export const getCartItemQuantityByVariantId =
  (id: number) => (state: ICartStore) => {
    return (
      state.cartItems.find(
        (cartItem: ICartItem) => cartItem.selectedVariant.id! === id,
      )?.quantity || 0
    );
  };
export const getSubtotalPrice = (state: ICartStore) => state.subtotalPrice;
export const getClientId = (state: ICartStore) => state.clientId;
