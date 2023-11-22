import useClientsQuery from '@/modules/cart/hooks/useClientQuery';
import useFormControl from '@/modules/common/hooks/useFormControl';
import IClient from '@/modules/cart/interfaces/IClient';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import FormField from '@/modules/common/components/FormFieldText';
import Loader from '@/modules/common/components/Loader';
import { RenderIf } from '@/modules/common/components/RenderIf';
import useCreateClientMutation from '@/modules/cart/hooks/useCreateOrderMutation.1';
import { PencilIcon, PhoneIcon, TrashIcon } from '@heroicons/react/24/solid';
import FieldLabel from '@/modules/common/components/FieldLabel';
import useUpdateClientMutation from '@/modules/cart/hooks/useUpdateClientMutation';

interface IProps {
  onSelect: (client: IClient | null) => void;
  defaultClient?: IClient;
}

interface IClientForm {
  id?: number;
  name: string;
  phone_number: string;
  address: string;
}

export default function ClientForm({ onSelect, defaultClient }: IProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IClientForm>({
    defaultValues: {
      id: 0,
      phone_number: '',
      address: '',
      name: '',
    },
  });

  const { handleChange, value: search } = useFormControl('');
  const { setValue: setClient, value: client } = useFormControl(defaultClient);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [query] = useDebounce(search, 500);

  const [updateMode, setUpdateMode] = useState(false);
  const clientQuery = useClientsQuery(query);

  const createClientMutation = useCreateClientMutation();
  const updateClientMutation = useUpdateClientMutation();

  const clearForm = () => {
    setClient(null);
    onSelect(null);
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    return dialogRef.current?.close();
  };
  const handleClick = (client: IClient) => () => {
    onSelect(client);
    setClient(client);
  };

  const handleSubmitCreateClient = (data: IClientForm) => {
    createClientMutation.mutate(data);
    reset();
  };

  const handleDeleteClient = () => {
    setClient(null);
    onSelect(null);
  };

  const handleSubmitUpdateClientMutation = (data: IClientForm) => {
    updateClientMutation.mutate({
      id: data.id!,
      name: data.name,
      address: data.address,
      number_phone: data.phone_number,
    });
  };

  const handleClickSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateMode) {
      handleSubmit(handleSubmitUpdateClientMutation)(e);
    } else {
      handleSubmit(handleSubmitCreateClient)(e);
    }
    clearForm();
    dialogRef.current?.close();
  };

  const handleClickUpdateClient =
    (client: IClient) => (e: React.MouseEvent) => {
      setUpdateMode(true);
      dialogRef.current?.showModal();
      setValue('id', client.id);
      setValue('name', client.name);
      setValue('phone_number', client.phone_number);
      setValue('address', client.address);
    };

  return (
    <section className="bg-red w-full sm:w-96">
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
              {updateMode ? (
                <button className="btn">Actualizar cliente</button>
              ) : (
                <button className="btn">Crear cliente</button>
              )}
            </div>
            <div className="modal-action">
              <button className="btn btn-link" onClick={handleClose}>
                Cerrar
              </button>
            </div>
          </section>
        </form>
      </dialog>
      <FieldLabel
        title="Buscar cliente por Nombre, Direc. o Tel."
        className="input-group flex flex-col"
      >
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
      </FieldLabel>
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
                className="w-full p-5 border-2 border-stone-500 hover:border-stone-300 hover:cursor-pointer"
                onClick={handleClick(client)}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-xl">{client.name}</p>
                  <button
                    className="btn-sm btn-primary"
                    onClick={handleClickUpdateClient(client)}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-row pt-3 justify-between">
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
