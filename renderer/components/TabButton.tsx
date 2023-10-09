import { twMerge } from 'tailwind-merge';
type IProps = React.HTMLProps<HTMLDivElement> & {
  isActive?: boolean;
};

const TabButton = ({ className, children, isActive, ...props }: IProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'flex flex-row items-center gap-2 btn btn-outline btn-accent',
        isActive && 'btn-active',

        className,
      )}
    >
      {' '}
      {children}
    </div>
  );
};

export default TabButton;
