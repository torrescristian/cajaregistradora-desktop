interface IProps {
  disabled: boolean;
  handleSubmit: () => void;
}

function UpdateProductButton({ disabled, handleSubmit }: IProps) {
  return (
    <button
      className="btn-success btn text-white w-full"
      disabled={disabled}
      onClick={handleSubmit}
    >
      Actualizar
    </button>
  );
}

export default UpdateProductButton;
