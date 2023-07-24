import IProductUI from '@/interfaces/IProduct';

export interface IActionButton {
  onClick: () => void;
}

export interface IComponent {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface ICollapseTitle {
  product: IProductUI;
}

export interface FormControl {
  text: string;
  name: string;
  type: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  suffix?: string;
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  textAlign?: 'text-left' | 'text-center' | 'text-right';
}
