import useCancelCashBalanceMutation from "@/hooks/services/useCancelCashBalanceMutation"

interface IProps {
    cashBalanceId: number;
}

export const CloseCashBalance = ({cashBalanceId}:IProps)  => {
   const cancelCashBalanceMutation = useCancelCashBalanceMutation();

   const handleCancelCashBalance = () =>{
      cancelCashBalanceMutation.mutate(cashBalanceId);
   }
    return (
        <button className="btn flex w-fit bg-red-500 text-stone-50 hover:bg-red-600" onClick={handleCancelCashBalance}>
            Cerrar caja
        </button>
    )
    //TODO:create confirm modal 
}