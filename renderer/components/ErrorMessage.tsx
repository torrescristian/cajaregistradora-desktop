interface IProps {
  children?: any;
}

export default function ErrorMessage({ children }: IProps) {
  return <p className="alert alert-error">{children}</p>;
}
