import { IProductType } from '@/modules/products/interfaces/IProduct';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import FieldLabel from '@/modules/common/components/FieldLabel';
import EmojiSelector from './EmojiSelector';
import useCreateProductType from '@/modules/cupones/hooks/useCreateProductType';
import { ButtonClose } from '@/modules/common/components/ButtonClose';

export const CreateProductTypeMenuModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProductType>();

  const ref = useRef<HTMLDialogElement>(null);
  const createProductType = useCreateProductType();

  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleChangeSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };
  const handleOpenModalProductType = (e: any) => {
    e.preventDefault();
    ref.current?.showModal();
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    setSelectedEmoji(null);
    return ref.current?.close();
  };

  const handleCreateProductTypeMenu = (data: IProductType) => {
    createProductType.mutate({
      name: data.name,
      /* @ts-ignore  */
      emoji: selectedEmoji,
    });
    reset();
    setSelectedEmoji(null);
    return ref.current?.close();
  };
  return (
    <section>
      <div className="bg-base-100 modal-box p-3 ">
        <EmojiSelector
          selectedEmoji={selectedEmoji!}
          setSelectedEmoji={setSelectedEmoji}
          onChange={handleChangeSelectEmoji}
        />
        <form
          onSubmit={handleSubmit(handleCreateProductTypeMenu)}
          className="flex flex-col p-5 w-full gap-4"
        >
          <FieldLabel
            title="Título del Menu:"
            className="gap-4 items-center"
            columnMode
          >
            <input
              type="text"
              className="input input-bordered"
              {...register('name')}
            />
          </FieldLabel>
          <div className="flex flex-row justify-around p-5">
            <button className="btn btn-success w-min" type="submit">
              Crear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
