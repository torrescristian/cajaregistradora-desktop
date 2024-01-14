import useClientsQuery from '@/modules/cart/hooks/useClientQuery';
import useFormControl from '@/modules/common/hooks/useFormControl';
import IClient from '@/modules/cart/interfaces/IClient';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import FormField from '@/modules/common/components/FormFieldText';
import Loader from '@/modules/common/components/Loader';
import { RenderIf } from '@/modules/common/components/RenderIf';
import {
  PencilIcon,
  PhoneIcon,
  TrashIcon,
  UserPlusIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import FieldLabel from '@/modules/common/components/FieldLabel';
import useCreateClientMutation from '../hooks/useCreateClientMutation';
import useUpdateClientMutation from '../hooks/useUpdateClientMutation';
import { ButtonClose } from '@/modules/common/components/ButtonClose';
import { Divider } from './Sale/Sale.styles';

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

  const {
    handleChange,
    value: search,
    setValue: setSearch,
  } = useFormControl('');
  const { setValue: setClient, value: client } = useFormControl(defaultClient);
  const createClientDialogRef = useRef<HTMLDialogElement>(null);
  const selectClientDialogRef = useRef<HTMLDialogElement>(null);

  const [query] = useDebounce(search, 500);

  const [updateMode, setUpdateMode] = useState(false);
  const clientQuery = useClientsQuery(query);

  const createClientMutation = useCreateClientMutation();
  const updateClientMutation = useUpdateClientMutation();

  const clearForm = () => {
    setClient(null);
    onSelect(null);
    setSearch('');
  };

  const handleCloseCreateDialog = (e: any) => {
    e.preventDefault();
    return createClientDialogRef.current?.close();
  };
  const handleCloseSelectDialog = (e: any) => {
    e.preventDefault();
    clearForm();
    return selectClientDialogRef.current?.close();
  };
  const handleClickClient =
    (client: IClient) => (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      onSelect(client);
      setClient(client);
      setSearch('');
      selectClientDialogRef.current?.close();
    };

  const handleSubmitCreateClient = (data: IClientForm) => {
    createClientMutation.mutate({
      name: data.name,
      address: data.address,
      phone_number: data.phone_number,
    });
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
      phone_number: data.phone_number,
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
    createClientDialogRef.current?.close();
  };

  const handleClickUpdateClient =
    (client: IClient) => (e: React.MouseEvent) => {
      e.preventDefault();
      setUpdateMode(true);
      createClientDialogRef.current?.showModal();
      setValue('id', client.id);
      setValue('name', client.name);
      setValue('phone_number', client.phone_number);
      setValue('address', client.address);
    };

  return (
    <section className="bg-red w-full sm:w-96">
      <dialog ref={createClientDialogRef} className="p-10">
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
              <ButtonClose label="Cerrar" onClick={handleCloseCreateDialog} />
            </div>
            <div className="modal-action">
              {updateMode ? (
                <button className="btn">Actualizar cliente</button>
              ) : (
                <button className="btn">Crear cliente</button>
              )}
            </div>
          </section>
        </form>
      </dialog>
      <dialog ref={selectClientDialogRef} className="p-10 gap-3">
        <FieldLabel
          title="Buscar cliente por nombre, dirección o número de teléfono"
          className="input-group flex flex-col"
        >
          <div className="w-full flex flex-nowrap p-3">
            <input
              onChange={handleChange}
              value={search}
              className="input input-bordered flex-1"
            />
            <button
              className="btn btn-success btn-outline gap-3"
              onClick={() => createClientDialogRef.current?.showModal()}
            >
              <UserPlusIcon className="h-4 w-4" /> Nuevo
            </button>
          </div>
        </FieldLabel>
        <RenderIf condition={!clientQuery.isLoading}>
          <RenderIf condition={!!clientQuery?.data}>
            <ul className="h-72 overflow-y-scroll flex flex-col justify-start items-end mt-3">
              {clientQuery.data?.map((client) => (
                <li
                  key={client.id}
                  className="w-full p-5 border-2 border-stone-500 hover:border-stone-300 hover:cursor-pointer"
                  onClick={handleClickClient(client)}
                >
                  <div className="flex flex-row justify-between">
                    <p className="text-xl text-base-content">{client.name}</p>
                    <button
                      className="btn-sm btn-primary"
                      onClick={handleClickUpdateClient(client)}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-row pt-3 justify-between">
                    <p className="text-sm text-base-content">
                      {client.address}
                    </p>
                    <RenderIf condition={Boolean(client.phone_number)}>
                      <p className="text-sm text-base-content flex flex-row items-center gap-2">
                        <PhoneIcon className="h-4 w-4" /> {client.phone_number}
                      </p>
                    </RenderIf>
                  </div>
                </li>
              ))}
            </ul>
          </RenderIf>
        </RenderIf>
        <RenderIf condition={clientQuery.isLoading}>
          <Loader className="my-24" />
        </RenderIf>
        <div className="w-full flex flex-row justify-end">
          <ButtonClose
            label="Cerrar"
            className="self-right"
            onClick={handleCloseSelectDialog}
          />
        </div>
      </dialog>
      <Divider className="my-10">Cliente</Divider>
      <div className="flex flex-row w-full justify-between">
        <RenderIf condition={client?.name}>
          <section className="flex flex-row w-full justify-between gap-3 pt-1 pb-3 items-center">
            <div className="flex flex-row gap-3">
              <p className="opacity-60">Cliente Seleccionado: </p>
              <p className="">{client?.name}</p>
            </div>
            <button className="btn btn-error " onClick={handleDeleteClient}>
              <TrashIcon className="h-4 w-4" />
            </button>
          </section>
        </RenderIf>
        <RenderIf condition={!client?.name}>
          <section className="flex flex-row gap-3 items-center w-full">
            <UserIcon className="w-4 h-4 opacity-60" />{' '}
            <p className="opacity-60">Consumidor Final</p>
            <button
              className="btn btn-neutral"
              onClick={() => selectClientDialogRef.current?.showModal()}
            >
              Seccionar Cliente
            </button>
          </section>
        </RenderIf>
      </div>
    </section>
  );
}
