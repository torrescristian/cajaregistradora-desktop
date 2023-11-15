import deepEqual from 'deep-equal';
import { useEffect } from 'react';
import { ICartState } from '@/interfaces/ICart';
import Cookie from 'js-cookie';
import IUser from '@/interfaces/IUser';
import { useCartStore } from '@/state/CartStore';

// KEYS
export const CART_KEY = 'cart';

export const USER_KEY = 'user';

// SETTERS
export const setCartInStorage = (cart: ICartState): void => {
  Cookie.set(CART_KEY, JSON.stringify(cart));
};

// GETTERS
export const getCartFromStorage = (): ICartState => {
  const cart = Cookie.get(CART_KEY) || '';

  return cart ? JSON.parse(cart) : structuredClone(defaultCartState);
};

export const getUserFromStorage = (): IUser => {
  const user = Cookie.get(USER_KEY) || '';

  return user ? JSON.parse(user) : {};
};

// DEFAULT
const defaultCartState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// HOOKS
export const useLoadShopCart = (): void => {
  const cartStore = useCartStore((state) => state);

  useEffect(() => {
    const _cartStore = getCartFromStorage();

    if (_cartStore) {
      cartStore.initCart(_cartStore);
    }
  }, []);

  useEffect(() => {
    const { reset, ...state } = cartStore;
    const cartStateIsNotDefault = !deepEqual(state, defaultCartState);

    if (cartStateIsNotDefault || reset) {
      setCartInStorage(state);
    }
  }, [cartStore]);
};
