import { ICategoryFieldPopulate } from '@/interfaces/ICategory';
import { useEffect, useReducer } from 'react';

export interface ICategoryUI {
  id: number;
  name: string;
  parent: ICategoryUI | null;
  subcategories: ICategoryUI[];
}

const initialize = (data: ICategoryFieldPopulate[]) => ({
  type: 'INITIALIZE',
  payload: data,
});

export interface IUseCategoriesResponse {
  categories: ICategoryUI[];
  initialize: (data: ICategoryFieldPopulate[]) => void;
}

const useCategories = (
  data: ICategoryFieldPopulate[]
): IUseCategoriesResponse => {
  const [categories, dispatch] = useReducer(
    (state: ICategoryUI[], action: any) => {
      switch (action.type) {
        case 'INITIALIZE': {
          const newState = data.map((category) => {
            return {
              id: category.id,
              name: category.attributes.name,
              parent: null,
              subcategories: category.attributes.children.data.map(
                (subcategory) => {
                  return {
                    id: subcategory.id,
                    name: subcategory.attributes.name,
                    subcategories: [],
                    parent: {
                      id: category.id,
                      name: category.attributes.name,
                      subcategories: [],
                      parent: null,
                    },
                  };
                }
              ),
            };
          });

          return newState;
        }
        default:
          return state;
      }
    },

    []
  );

  useEffect(() => {
    if (!data) return;

    dispatch(initialize(data));
  }, [data]);

  return {
    categories,
    initialize: (data: ICategoryFieldPopulate[]) => dispatch(initialize(data)),
  };
};

export default useCategories;
