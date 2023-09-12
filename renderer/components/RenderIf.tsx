interface IProps {
  children: any;
  condition: any;
}

export const RenderIf = ({ children, condition }: IProps) => {
  return condition ? children : null;
};
