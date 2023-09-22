import { twMerge } from "tailwind-merge";

interface IProps {
    children?: any;
    className?: string;
  }
  
  export default function SuccessMessage({ children, className }: IProps) {
    return <p className={twMerge("alert alert-success",className)}>{children}</p>;
  }
  