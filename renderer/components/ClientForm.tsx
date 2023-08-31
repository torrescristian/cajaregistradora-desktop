import useClientsQuery from '@/hooks/services/useClientQuery';
import useFormControl from '@/hooks/useFormControl';
import IClient from '@/interfaces/IClient';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import FormField from './FormFieldText';
import Loader from './Loader';
import { RenderIf } from './RenderIf';
import useCreateClientMutation from '@/hooks/services/useCreateClientMutation';

interface IProps {
  onSelect: (client: IClient) => void;
}

interface IClientForm {
  name: string;
  phone_number: string;
  address: string;
}

export default function ClientForm({ onSelect }: IProps) {
  const { handleChange, value: search } = useFormControl('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [query] = useDebounce(search, 500);

  const clientQuery = useClientsQuery(query);

  const createClientMutation = useCreateClientMutation();

  const handleClick = (client: IClient) => () => {
    onSelect(client);
  };

  const handleSubmitCreateClient = (data: IClientForm) => {
    // client mutation
    createClientMutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClientForm>();

  return (
    <section className="bg-red">
      <dialog ref={dialogRef} className="p-10">
        <form
          onSubmit={handleSubmit(handleSubmitCreateClient)}
          className="flex flex-col gap-3"
        >
          <FormField
            errors={errors}
            formKey="name"
            label="Nombre: "
            register={register}
          />
          <FormField
            errors={errors}
            formKey="phone_number"
            label="Teléfono: "
            register={register}
          />
          <FormField
            errors={errors}
            formKey="address"
            label="Dirección: "
            register={register}
          />
          <section className="flex flex-row w-full justify-between">
            <div className="modal-action">
              <button className="btn">Crear cliente</button>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-link"
                onClick={() => dialogRef.current?.close()}
              >
                Cerrar
              </button>
            </div>
          </section>
        </form>
      </dialog>
      <label>
        Buscar cliente
        <input
          onChange={handleChange}
          value={search}
          className="input input-bordered my-3"
        />
      </label>
      <RenderIf condition={clientQuery.isLoading}>
        <Loader />
      </RenderIf>
      <RenderIf condition={!clientQuery.isLoading}>
        <RenderIf condition={!!clientQuery?.data}>
          <ul className='h-72 overflow-y-scroll'>
            {clientQuery.data?.map((client) => (
              <li
                key={client.id}
                className="p-3 border-2 border-stone-500 hover:border-stone-300 hover:cursor-pointer"
                onClick={handleClick(client)}
              >
                <p>{client.name}</p>
                <p>{client.address}</p>
                <p>{client.phone_number}</p>
              </li>
            ))}
          </ul>
        </RenderIf>
        <RenderIf condition={!clientQuery.data?.length}>
          <p>No existe el cliente, desea crear uno?</p>
          <button
            className="btn btn-info"
            onClick={() => dialogRef.current?.showModal()}
          >
            Crear Cliente
          </button>
        </RenderIf>
      </RenderIf>
    </section>
  );
}
