/* 'use client';
import { ICartAction, ICartItem, ICartState } from '@/interfaces/ICart';
import React, { createContext, useReducer } from 'react';
import IProductUI from '@/interfaces/IProduct';

interface IUpdatePriceProps {
  newPrice: number;
  product: IProductUI;
}

const defaultCartState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  clientName: '',
  clientPhone: '',
  clientAddress: '',
  totalPrice: 0,
  additionalDetails: '',
} as ICartState;

const fixPrice = (price: number) => Math.round(price * 100) / 100;

const cartReducer = (state: ICartState, action: ICartAction): ICartState => {
  const { type, payload } = action;

  const productPayload = payload as IProductUI;
  const cartStatePayload = payload as ICartState;
  const updatePricePayload = payload as IUpdatePriceProps;

  switch (type) {
    case 'INIT_CART': {
      return {
        ...state,
        cartItems: cartStatePayload.cartItems,
        totalAmount: cartStatePayload.totalAmount,
        totalQuantity: cartStatePayload.totalQuantity,
      };
    }
    case 'ADD_PRODUCT': {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.id === productPayload.id,
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

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            product: productPayload,
            quantity: 1,
            selectedVariant: productPayload.defaultVariant,
          },
        ],
        totalAmount: fixPrice(
          state.totalAmount + productPayload.defaultVariant.price,
        ),
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case 'REMOVE_PRODUCT': {
      const item: ICartItem | undefined = state.cartItems.find(
        (item: ICartItem) => item.product.id === productPayload.id,
      );

      if (item?.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item: ICartItem) => item.product.id !== productPayload.id,
          ),
          totalAmount: fixPrice(
            Math.max(
              state.totalAmount - productPayload.defaultVariant.price,
              0,
            ),
          ),
          totalQuantity: Math.max(state.totalQuantity - 1, 0),
          reset: true,
        };
      }

      if (item) {
        return {
          ...state,
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
              state.totalAmount - productPayload.defaultVariant.price,
              0,
            ),
          ),
          totalQuantity: Math.max(state.totalQuantity - 1, 0),
          reset: true,
        };
      }
    }
    case 'REMOVE_CART_ITEM': {
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
            return acc + item.product.defaultVariant.price * item.quantity;
          }
          return acc;
        }, 0);

      return {
        ...state,
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
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
        reset: true,
      };
    }
    case 'UPDATE_PRICE': {
      const newState = {
        ...state,
        cartItems: state.cartItems.map((item: ICartItem) => {
          if (item.product.id === updatePricePayload.product.id) {
            const newItem = structuredClone(item);
            newItem.product.defaultVariant.price = updatePricePayload.newPrice;
            return newItem;
          }
          return item;
        }),
      };

      console.log({ newState, alternativePricePayload: updatePricePayload });

      return structuredClone(newState);
    }
    default: {
      return state;
    }
  }
};

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

// actions
export const addProduct = (product: IProductUI): ICartAction => ({
  type: 'ADD_PRODUCT',
  payload: product,
});

export const removeProduct = (product: IProductUI): ICartAction => ({
  type: 'REMOVE_PRODUCT',
  payload: product,
});

export const removeCartItem = (product: IProductUI): ICartAction => ({
  type: 'REMOVE_CART_ITEM',
  payload: product,
});

export const clearCart = (): ICartAction => ({
  type: 'CLEAR_CART',
});

export const updatePrice = (props: IUpdatePriceProps): ICartAction => ({
  type: 'UPDATE_PRICE',
  payload: props,
});

export const initCartState = (cartState: ICartState): ICartAction => ({
  type: 'INIT_CART',
  payload: cartState,
});

// context
export const CartContext = createContext<{
  state: ICartState;
  dispatch: React.Dispatch<ICartAction>;
}>({
  state: defaultCartState,
  dispatch: () => null,
});

 export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, defaultCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}; 

export const useCartState = () => {
  const { state } = React.useContext(CartContext);
  return state;
};

export const useCartDispatch = () => {
  const { dispatch } = React.useContext(CartContext);
  return dispatch;
};

export const useCartSelect = (fn: (state: ICartState) => any) => {
  const state = useCartState();
  return fn(state);
};
 */
