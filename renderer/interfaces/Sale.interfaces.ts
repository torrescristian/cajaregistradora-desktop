import ISaleUI, { ISaleItem } from '@/interfaces/ISale';

export type IContainerProps = {
  children: React.ReactNode;
};

export type IProps = {
  sale: ISaleUI;
};

export type ISaleItemProps = {
  item: ISaleItem;
};
