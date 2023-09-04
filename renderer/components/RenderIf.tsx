interface IProps {
  children: any;
  condition: boolean;
}

export const RenderIf = ({ children, condition }: IProps) => {
  return condition ? children : null;
};
