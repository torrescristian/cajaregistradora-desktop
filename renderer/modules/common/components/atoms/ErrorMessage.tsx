interface IProps {
  children?: any;
}

export default function ErrorMessage({ children }: IProps) {
  return children && <p className="alert alert-error">{children}</p>;
}
