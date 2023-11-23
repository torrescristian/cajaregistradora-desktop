import ISaleUI, { ISaleItem } from '@/modules/cart/interfaces/ISale';

export type IContainerProps = {
  children: React.ReactNode;
};

export type IProps = {
  sale: ISaleUI;
};

export type ISaleItemProps = {
  item: ISaleItem;
};
