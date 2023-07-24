import { IProduct } from './IProduct';
import { INativeResponse, IPayload, IResponsePage } from './utils';

export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
  store: number;
  parent: ICategory;
  childrens: ICategory[];
  emoji: string;
}

export interface ICategoryField {
  id: number;
  attributes: Partial<{
    createdAt: string;
    updatedAt: string;
    name: string;
    products: IProduct[];
    store: number;
    parent: ICategoryField;
    children: ICategoryField[];
  }>;
}

export interface ICategoryFieldPopulate {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    products: {
      data: IProduct[];
    };
    store: {
      data: any;
    };
    parent: {
      data: ICategoryFieldPopulate | null;
    };
    children: {
      data: ICategoryFieldPopulate[];
    };
  };
}

export type ICategoryPayload = IPayload<ICategory>;

export type ICategoryPage = IResponsePage<ICategory>;

export type ICategoryResponse = INativeResponse<ICategoryField>;

export type ICategoryResponsePopulate = INativeResponse<ICategoryFieldPopulate>;
