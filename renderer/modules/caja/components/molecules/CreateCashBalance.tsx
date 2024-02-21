interface ICreateCashBalanceProps {
  onClick: () => void;
}

const CreateCashBalance = ({ onClick }: ICreateCashBalanceProps) => (
  <button
    className="btn flex w-fit btn-primary text-primary-content"
    onClick={onClick}
  >
    Iniciar Caja
  </button>
);

export default CreateCashBalance;
