import { useForm } from 'react-hook-form';

import FormInput from '@/modules/common/components/atoms/FormInput';
import SubmitButton from '@/modules/common/components/atoms/SubmitButton';
import ModalTemplate from '@/modules/common/components/templates/ModalTemplate';
import {
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';

import CreateTableModal from './CreateTableModal';
import useCreateTableCategoryMutation from '../../hooks/useCreateTableCategoryMutation';
import { ITableCategoryPayload } from '../../interfaces/ITable';
import FormSelector from '@/modules/common/components/atoms/FormSelector';
import DefaultOption from '@/modules/common/components/atoms/DefaultOption';
import Label from '@/modules/common/components/atoms/Label';
import FieldLabel from '@/modules/common/components/atoms/FieldLabel';
import { twMerge } from 'tailwind-merge';

interface IProps {
  value: string;
  onClick: (value: string) => void;
  selectedColor: string;
}

const ColorBox = ({ value, onClick, selectedColor }: IProps) => {
  const selected = selectedColor === value;

  return (
    <div
      className={twMerge(
        'w-6 h-6 rounded-sm',
        selected ? 'border-2 border-white' : 'border-2 border-transparent',
      )}
      style={{ backgroundColor: value }}
      onClick={() => onClick(value)}
    />
  );
};

export default function CreateCategoryModal() {
  const { register, handleSubmit, setValue, watch } =
    useForm<ITableCategoryPayload>();
  const createCategoryMutation = useCreateTableCategoryMutation();
  const openModal = useModalStore(getOpenModal);

  const handleClickSubmit = async (data: ITableCategoryPayload) => {
    await createCategoryMutation.mutateAsync(data);
    openModal(<CreateTableModal />);
  };

  return (
    <ModalTemplate style={{ backgroundColor: watch('color') }}>
      <form onSubmit={handleSubmit(handleClickSubmit)}>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg">Crear Categoria</h2>
          <FormInput label="Nombre" {...register('name')} />
          <FieldLabel title="Color">
            <div className="flex justify-around w-full">
              <ColorBox
                value="#3EC1D3"
                selectedColor={watch('color')}
                onClick={(value) => setValue('color', value)}
              />
              <ColorBox
                value="#F6F7D7"
                selectedColor={watch('color')}
                onClick={(value) => setValue('color', value)}
              />
              <ColorBox
                value="#FF9A00"
                selectedColor={watch('color')}
                onClick={(value) => setValue('color', value)}
              />
              <ColorBox
                value="#FF165D"
                selectedColor={watch('color')}
                onClick={(value) => setValue('color', value)}
              />
            </div>
          </FieldLabel>
          <SubmitButton
            mutation={createCategoryMutation}
            className="btn btn-primary"
          >
            Crear Categoria
          </SubmitButton>
        </div>
      </form>
    </ModalTemplate>
  );
}
