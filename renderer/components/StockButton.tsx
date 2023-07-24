
interface IProps {
  initialStock: number;
  currentStock: number;
  handleSubmit: () => void;

}

function StockButton({initialStock,currentStock, handleSubmit}: IProps) {
  return (
    <button
    className="btn-success btn text-white w-full"
    disabled={currentStock === initialStock}
    onClick={handleSubmit}
    >
    Actualizar
  </button>
  )
}

export default StockButton;