import { ICartItem, ICartState } from '@/interfaces/ICart';
import { DISCOUNT_TYPE } from '@/interfaces/IOrder';
import { IProduct, IVariant } from '@/interfaces/IProduct';
import { calcDiscount } from '@/libs/utils';
import { stat } from 'fs';
import { create } from 'zustand';

interface IAddProductProps {
  product: IProduct;
  selectedVariant: IVariant;
}

type ISetCart = Pick<
  ICartStore,
  | 'cartItems'
  | 'totalPrice'
  | 'clientId'
  | 'additionalDetails'
  | 'subtotalPrice'
  | 'discountAmount'
  | 'discountType'
>;

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
  setCart: (cartPayload: ISetCart) => void;
  setAdditionalDetails: (additionalDetails: string) => void;
  setDiscountType: (discountType: DISCOUNT_TYPE) => void;
  setDiscountAmount: (discountAmount: number) => void;
};

export const useCartStore = create<ICartStore>()((set) => ({
  cartItems: [],
  subtotalPrice: 0,
  totalPrice: 0,
  discountType: DISCOUNT_TYPE.FIXED,
  discountAmount: 0,
  additionalDetails: '',
  clientId: 0,
  initCart: (cartPayload: ICartState) =>
    set({
      cartItems: cartPayload.cartItems,
      subtotalPrice: cartPayload.subtotalPrice,
    }),
  setCart: (cartPayload: ISetCart) =>
    set({
      cartItems: cartPayload.cartItems,
      clientId: cartPayload.clientId,
      additionalDetails: cartPayload.additionalDetails,
      subtotalPrice: cartPayload.subtotalPrice,
      totalPrice: cartPayload.totalPrice,
      discountType: cartPayload.discountType,
      discountAmount: cartPayload.discountAmount,
    }),
  addProduct: ({ product, selectedVariant }: IAddProductProps) => {
    set((state): Partial<ICartStore> => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.selectedVariant.id! === selectedVariant.id!,
      );

      if (itemIndex >= 0) {
        const newCartItems = structuredClone(state.cartItems);
        const cartItem = newCartItems[itemIndex];
        cartItem.quantity += 1;
        return {
          cartItems: newCartItems,
          subtotalPrice: fixPrice(state.subtotalPrice + selectedVariant.price),
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
        subtotalPrice: fixPrice(state.subtotalPrice + selectedVariant.price),
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
          subtotalPrice: fixPrice(
            Math.max(state.subtotalPrice - selectedVariant.price, 0),
          ),
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
          subtotalPrice: fixPrice(
            Math.max(state.subtotalPrice - selectedVariant.price, 0),
          ),
          reset: true,
        };
      }
      return state;
    }),
  removeCartItem: ({ selectedVariant }: IAddProductProps) =>
    set((state: any) => {
      const subtotalPrice =
        state.subtotalPrice -
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
        subtotalPrice: fixPrice(Math.max(subtotalPrice, 0)),
        reset: true,
      };
    }),
  clearCart: () =>
    set({
      cartItems: [],
      totalPrice: 0,
      subtotalPrice: 0,
      reset: true,
    }),
  addClientId: (clientId: number | null) => set({ clientId }),

  setAdditionalDetails: (additionalDetails: string) =>
    set({ additionalDetails }),
  setDiscountType: (discountType: DISCOUNT_TYPE) =>
    set((state: ICartState) => ({
      discountType,
      totalPrice: calcDiscount({
        discountAmount: state.discountAmount!,
        discountType,
        price: state.subtotalPrice,
      }),
    })),
  setDiscountAmount: (discountAmount: number) =>
    set((state) => ({
      discountAmount,
      totalPrice: calcDiscount({
        discountAmount,
        discountType: state.discountType!,
        price: state.subtotalPrice,
      }),
    })),
}));

// selectors
export const getCartState = (state: ICartStore) => state;
export const getTotalPrice = (state: ICartStore) => state.totalPrice;
export const getCartItems = (state: ICartStore) => state.cartItems;

export const getAdditionalDetails = (state: ICartStore) =>
  state.additionalDetails;
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
export const getSetCart = (state: ICartStore) => state.setCart;
export const getSetAdditionalDetails = (state: ICartStore) =>
  state.setAdditionalDetails;
export const getSetDiscountType = (state: ICartStore) => state.setDiscountType;
export const getSetDiscountAmount = (state: ICartStore) =>
  state.setDiscountAmount;

export const getDiscountType = (state: ICartStore) => state.discountType;
export const getDiscountAmount = (state: ICartStore) => state.discountAmount;
