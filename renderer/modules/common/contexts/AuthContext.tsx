import React, { useReducer, useEffect, useContext } from 'react';
import IUser from '@/modules/common/interfaces/IUser';
import strapi from '@/modules/common/libs/strapi';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import getUserByJWT from '@/modules/common/hooks/getUserByJWT';

export interface UserState {
  userData: IUser | undefined;
  isLoading: boolean;
  isOwner: boolean;
  isLoggedIn: boolean;
}
export interface UserAction {
  type: 'LOGIN' | 'LOGOUT' | 'LOADING' | 'SET_OWNER';
  payload?: any;
}

const initialState: UserState = {
  userData: undefined,
  isLoading: false,
  isOwner: false,
  isLoggedIn: false,
};

export const AuthContext = React.createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'LOGIN': {
      const userData = action.payload as IUser;

      return {
        ...state,
        userData,
        isLoading: false,
        isLoggedIn: true,
        isOwner: userData.role.type === 'owner',
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        userData: undefined,
        isLoading: false,
        isLoggedIn: false,
      };
    }
    case 'LOADING': {
      return { ...state, isLoading: true };
    }
    case 'SET_OWNER': {
      return { ...state, isOwner: action.payload };
    }
    default: {
      return state;
    }
  }
};

// actions
export const login = (user: IUser | undefined): UserAction => ({
  type: 'LOGIN',
  payload: user,
});
export const setIsLoading = (isLoading: boolean): UserAction => ({
  type: 'LOADING',
  payload: isLoading,
});
export const logout = (): UserAction => ({
  type: 'LOGOUT',
});
export const setOwner = (isOwner: boolean): UserAction => ({
  type: 'SET_OWNER',
  payload: isOwner,
});

// selectors
export const getAuthState = (state: UserState) => state;
export const getIsLoading = (state: UserState) => state.isLoading;
export const getIsLoggedIn = (state: UserState) => state.isLoggedIn;
export const getIsOwner = (state: UserState) => state.isOwner;
export const getUserData = (state: UserState) => state.userData;

// context
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
export const useAuthState = () => {
  const { state } = useAuthContext();
  return state;
};
export const useAuthDispatch = () => {
  const { dispatch } = useAuthContext();
  return dispatch;
};
export const AuthProvider = ({ children }: IComponent) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const jwt = strapi.getToken();

  const fetchLoggedInUser = async (token: string) => {
    if (!token) return;

    dispatch(setIsLoading(true));
    try {
      const user = await getUserByJWT(token);
      dispatch(login(user));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (jwt) {
      fetchLoggedInUser(jwt);
    }
  }, [jwt]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
