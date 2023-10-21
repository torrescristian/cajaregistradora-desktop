import Loader from './Loader';

type IProps = React.HTMLProps<HTMLButtonElement> & {
  mutation: any;
};

export default function SubmitButton({ mutation, children, ...props }: IProps) {
  return (
    <button
      {...props}
      type="submit"
      disabled={mutation.isLoading || props.disabled}
    >
      {mutation.isLoading ? <Loader /> : children}
    </button>
  );
}
