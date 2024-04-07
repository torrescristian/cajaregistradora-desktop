import { useForm } from 'react-hook-form';

import FormInput from '@/modules/common/components/atoms/FormInput';
import ModalTemplate from '@/modules/common/components/templates/ModalTemplate';
import SubmitButton from '@/modules/common/components/atoms/SubmitButton';
import FormSelector from '@/modules/common/components/atoms/FormSelector';
import DefaultOption from '@/modules/common/components/atoms/DefaultOption';

import { ITablePayload, TABLE_STATUS } from '../../interfaces/ITable';
import useCreateTableMutation from '../../hooks/useCreateTableMutation';
import useTableCategoryQuery from '../../hooks/useTableCategoryQuery';
import {
  getCloseModal,
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';
import CreateCategoryModal from './CreateCategoryModal';

export default function CreateTableModal() {
  const { register, handleSubmit } = useForm<ITablePayload>({
    defaultValues: {
      status: TABLE_STATUS.FREE,
    },
  });

  const createTableMutation = useCreateTableMutation();
  const tableCategoryQuery = useTableCategoryQuery();
  const openModal = useModalStore(getOpenModal);
  const closeModal = useModalStore(getCloseModal);

  const handleClickAddCategory = () => {
    openModal(<CreateCategoryModal />);
  };

  const handleClickSubmit = async (data: ITablePayload) => {
    await createTableMutation.mutateAsync(data);
    closeModal();
  };

  return (
    <ModalTemplate>
      <form onSubmit={handleSubmit(handleClickSubmit)}>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg">Crear Mesa</h2>
          <FormInput label="Codigo Mesa" {...register('code')} />
          <FormSelector label="Categoria" full {...register('category')}>
            <DefaultOption />
            {tableCategoryQuery.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </FormSelector>
          <button
            className="btn btn-outline text-base-content w-full btn-warning"
            onClick={handleClickAddCategory}
          >
            Agregar Categoria
          </button>
          <SubmitButton
            mutation={createTableMutation}
            className="btn btn-primary"
          >
            Crear Mesa
          </SubmitButton>
        </div>
      </form>
    </ModalTemplate>
  );
}
