interface IProps {
  children: any;
  tabIndex?: number;
}

export const Card = ({ children, tabIndex }: IProps) => {
  return (
    <section className="flex flex-col relative p-4 items-center justify-between border-2 border-secondary">
      {children}
    </section>
  );
};
