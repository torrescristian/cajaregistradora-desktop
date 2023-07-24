import { IUseCreateVariantMutationProps } from '@/hooks/services/useCreateVariantMutation';
import ErrorMessage from '@/components/ErrorMessage';
import React, { useEffect } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';
import useSelectCategoriesProps from '@/hooks/useSelectCategories';
import DisplayCategories from './DisplayCategories';
import SelectSubcategory from './SelectCategory';

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col">{children}</div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <label className="label">
    <span className="label-text">{children}</span>
  </label>
);

interface IErrorMessageProps {
  errors: ReturnType<typeof useForm>['formState']['errors'];
}
const CustomErrorMessage = ({ errors }: IErrorMessageProps) => {
  if (!errors?.selectedCategory) return null;

  return (
    <ErrorMessage>
      {(errors as unknown as any)?.selectedCategory?.message}
    </ErrorMessage>
  );
};

interface IProps {
  errors: ReturnType<typeof useForm>['formState']['errors'];
  setValue: UseFormSetValue<IUseCreateVariantMutationProps>;
}

const SelectCategories = ({ errors, setValue }: IProps) => {
  const {
    subcategories,
    categories,
    handleChangeCategories,   
    handleChangeRemoveCategory,
    handleClickAddCategory,
  } = useSelectCategoriesProps();

  useEffect(() => {
    setValue(
      'categories',
      (categories || []).map((category) => category.id)
    );
  }, [categories]);

  return (
    <Container>
      <Title>Categorías</Title>
      <div className="form-control">
        <div className="input-group flex flex-col">
          <section className="flex flex-row">
            <SelectSubcategory
              className="w-2/3"
              subcategories={subcategories}
              handleChangeCategories={handleChangeCategories}
            />
            <button
              className="btn w-1/3 max-w-xs"
              onClick={handleClickAddCategory}
            >
              Agregar
            </button>
          </section>
          <CustomErrorMessage errors={errors} />
          <DisplayCategories
            categories={categories}
            handleChangeRemoveCategory={handleChangeRemoveCategory}
          />
        </div>
      </div>
      {errors?.categories && (
        <ErrorMessage>
          {(errors as unknown as any)?.selectedCategory?.message}
        </ErrorMessage>
      )}
    </Container>
  );
};

export default SelectCategories;
