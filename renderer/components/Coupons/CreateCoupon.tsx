import { useForm } from "react-hook-form"
import FormFieldText from "../FormFieldText";
import useCreateCouponMutation from "@/hooks/services/useCreateCouponMutation";

interface ICoupon {
    code: string;
    dueDate: string;
    maxAmount: number;
    availableUses: number;
}

export const CreateCoupon = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<ICoupon>({
        defaultValues: {
            code: '',
            dueDate: '',
            maxAmount: 0,
            availableUses: 0,
        }
    }
    );
    const createCouponMutation = useCreateCouponMutation();

    const handleSubmitCreateCoupon = (data: any) => {
        createCouponMutation.mutate(data);
    }

    return (
        <section className="flex flex-col gap-4 w-max">
                <div className="flex flex-col items-center">
                <h2>Crea tu cupon</h2>
                    <form onSubmit={handleSubmit(handleSubmitCreateCoupon)} className="flex flex-col p-4 gap-5 items-start">
                        <FormFieldText
                            register={register}
                            errors={errors}
                            formKey="code"
                            label="Nombre del cupon:"
                        />
                        <label className="label">
                            Fecha de expiracion:
                        </label>
                        <input type="date" {...register('dueDate')} className="w-full"/>
                        <FormFieldText
                            register={register}
                            errors={errors}
                            formKey="maxAmount"
                            label="Monto máximo:"
                        />
                        <FormFieldText
                        errors={errors}
                        register={register}
                        formKey="availableUses"
                        label="Cantidad de usos:"
                        />
                    <button className="btn btn-square w-full btn-primary" type="submit">Crear cupon</button>
                    </form>
                </div>
        </section>
    )
}