
import { IVariant } from '@/interfaces/IVariants';
import { useEffect, useReducer } from 'react';

interface ICategory {
  id: number;
  name: string;
  variants: IVariant[];
}

const initialize = (data: ICategory[]) => ({
  type: 'INITIALIZE',
  payload: data,
});

export interface IUseCategoriesResponse {
  categories: ICategory[];
  initialize: (data: ICategory[]) => void;
}

const useCategories = (
  data: ICategory[],
): IUseCategoriesResponse => {
  const [categories, dispatch] = useReducer(
    (state: ICategory[], action: any) => {
      switch (action.type) {
        case 'INITIALIZE': {
          const newState = data.map((category) => {
            return {
              id: category.id,
              name: category.name,
              variants: category.variants.map((variant) => ({
                id: variant.id!,
                name: variant.name,
                price: variant.price!,
                product: variant.product
              }as IVariant)),
            };
          });

          return newState;
        }
        default:
          return state;
      }
    },

    [],
  );

  useEffect(() => {
    if (!data) return;

    dispatch(initialize(data));
  }, [data]);

  return {
    categories,
    initialize: (data: ICategory[]) => dispatch(initialize(data)),
  };
};

export default useCategories;
