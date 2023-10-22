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
import { PhoneIcon, TrashIcon } from '@heroicons/react/24/solid';

interface IProps {
  onSelect: (client: IClient | null) => void;
  defaultClient?: IClient;
}

interface IClientForm {
  name: string;
  phone_number: string;
  address: string;
}

export default function ClientForm({ onSelect, defaultClient }: IProps) {
  const { handleChange, value: search } = useFormControl('');
  const { setValue: setClient, value: client } = useFormControl(defaultClient);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [query] = useDebounce(search, 500);

  const clientQuery = useClientsQuery(query);

  const createClientMutation = useCreateClientMutation();

  const handleClose = () => dialogRef.current?.close();

  const handleClick = (client: IClient) => () => {
    onSelect(client);
    setClient(client);
  };

  const handleSubmitCreateClient = (data: IClientForm) => {
    createClientMutation.mutate(data);
  };

  const handleDeleteClient = () => {
    setClient(null);
    onSelect(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClientForm>();

  const handleClickSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(), handleClose();
    handleSubmit(handleSubmitCreateClient)(e);
  };

  return (
    <section className="bg-red w-96">
      <dialog ref={dialogRef} className="p-10">
        <form onSubmit={handleClickSubmit} className="flex flex-col gap-3">
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
              <button className="btn btn-link" onClick={handleClose}>
                Cerrar
              </button>
            </div>
          </section>
        </form>
      </dialog>
      <label className="input-group flex flex-col">
        <span className="text-stone-500">
          Buscar cliente por Nombre, Direc. o Tel.
        </span>
        <input
          onChange={handleChange}
          value={search}
          className="input input-bordered my-3"
        />
        <RenderIf condition={client?.name}>
          <section className="flex flex-row justify-between gap-3 pt-1 pb-3 items-center">
            <div className="flex flex-col">
              <p className="text-stone-500">Cliente Seleccionado: </p>
              <p className="text-primary">{client?.name}</p>
            </div>
            <button
              className="btn btn-error text-stone-50"
              onClick={handleDeleteClient}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </section>
        </RenderIf>
        <RenderIf condition={!client?.name}>
          <section className="pt-1 pb-3">
            <p className="text-stone-500">Consumidor Final</p>
          </section>
        </RenderIf>
      </label>
      <RenderIf condition={clientQuery.isLoading}>
        <Loader />
      </RenderIf>
      <RenderIf condition={!clientQuery.isLoading}>
        <RenderIf condition={!!clientQuery?.data}>
          <p></p>
          <ul className="h-72 overflow-y-scroll flex flex-col justify-start items-end">
            {clientQuery.data?.map((client) => (
              <li
                key={client.id}
                className="w-full p-3 border-2 border-stone-500 hover:border-stone-300 hover:cursor-pointer"
                onClick={handleClick(client)}
              >
                <p>{client.name}</p>
                <div className="flex flex-row justify-between">
                  <p className="text-sm text-stone-500">{client.address}</p>
                  <RenderIf condition={Boolean(client.phone_number)}>
                    <p className="text-sm text-stone-500 flex flex-row items-center gap-2">
                      <PhoneIcon className="h-4 w-4" /> {client.phone_number}
                    </p>
                  </RenderIf>
                </div>
              </li>
            ))}
            <li>
              <button
                className="btn btn-secondary"
                onClick={() => dialogRef.current?.showModal()}
              >
                Nuevo Cliente
              </button>
            </li>
          </ul>
        </RenderIf>
      </RenderIf>
    </section>
  );
}
