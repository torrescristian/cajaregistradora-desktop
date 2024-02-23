import FieldLabel from '@/modules/common/components/FieldLabel';
import useCreateCashAddBalanceMutation from '@/modules/caja/hooks/useCreateCashAddBalanceMutation';
import { INewAddBalance } from '@/modules/caja/interfaces/INewAddBalance';
import { useForm } from 'react-hook-form';

interface IProps {
    data: INewAddBalance[];
  }

export default function CreateAddBalanceForm ({ data }: IProps) {
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
      } = useForm<INewAddBalance>();

    const createAddBalanceMutation = useCreateCashAddBalanceMutation();

    const handleSubmitCreateAddBalance = async (data: INewAddBalance) => {
        await createAddBalanceMutation.mutateAsync(data);
        reset();
      };

    return(
        <form className="w-full flex flex-row p-5 justify-center items-end gap-5"
                onSubmit={handleSubmit(handleSubmitCreateAddBalance)}>
            <FieldLabel title="Dinero a ingresar:" columnMode className="text-center">
                <input
                className="input input-bordered"
                type="number"
                {...register('amount')}
                />
            </FieldLabel>
            <FieldLabel title="Motivo:" columnMode className="text-center">
                <input type='text' className="input input-bordered"  
                {...register('reason')} />
            </FieldLabel>
            <button className="btn btn-primary">Confirmar</button>
        </form>
    )
}