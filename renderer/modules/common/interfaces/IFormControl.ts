export default interface IFormControl {
  text: string;
  name: string;
  type: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  suffix?: string;
  posfix?: string;
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  textAlign?: 'text-left' | 'text-center' | 'text-right';
}
