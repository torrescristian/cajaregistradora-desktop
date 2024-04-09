import { IProduct } from '@/modules/products/interfaces/IProduct';

export interface IComponent {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface ICollapseTitle {
  product: IProduct;
  updateMode?: boolean;
}
