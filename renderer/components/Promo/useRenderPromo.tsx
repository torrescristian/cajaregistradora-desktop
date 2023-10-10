import { getAddPromo, useCartStore } from '@/contexts/CartStore';
import { IPromo } from '@/interfaces/IPromo';
import { range } from '@/libs/utils';
import { useRef, useState } from 'react';

export default function useRenderPromo() {
  const addPromo = useCartStore(getAddPromo);
  const ref = useRef<HTMLDialogElement>(null);
  const [selectedPromo, setSelectedPromo] = useState<IPromo>();
  const [selectors, setSelectors] = useState<any>({});

  const createIndex = ({
    categoryIndex,
    quantityIndex,
  }: {
    categoryIndex: number;
    quantityIndex: number;
  }) => {
    return `${categoryIndex}-${quantityIndex}`;
  };
  const handleClickAddPromo = (promo: IPromo) => () => {
    if (promo.categories?.length) {
      setSelectedPromo(promo);
      ref.current?.showModal();
      return;
    }
    addPromo({ promo, selectedVariants: [] });
  };

  const handleSelectorChange =
    (selectorProps: { categoryIndex: number; quantityIndex: number }) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // Actualiza el estado cuando cambie un selector
      const newValue = e.target.value;
      setSelectors((prevSelectors: any) => ({
        ...prevSelectors,
        [createIndex(selectorProps)]: newValue,
      }));
    };

  const handleClickConfirmVariants = () => {
    const validatedSelections = selectedPromo?.categories
      .flatMap(({ category, quantity }, categoryIndex) =>
        range(quantity).map((_, quantityIndex) =>
          createIndex({ categoryIndex, quantityIndex }),
        ),
      )
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr]:
            selectors[curr] ||
            selectedPromo.categories[Number(curr.split('-')[0])].category
              .variants[0].id,
        }),
        {},
      )!;

    const selectorsId = Object.values(validatedSelections).map(Number);
    const allVariants =
      selectedPromo?.categories
        .map(({ category }) => category.variants)
        .flat() || [];
    const selectedVariants = selectorsId.map(
      (selectorId) => allVariants.find((variant) => variant.id === selectorId)!,
    );
    addPromo({
      promo: selectedPromo!,
      selectedVariants,
    });
    ref.current?.close();
  };

  return {
    createIndex,
    handleClickAddPromo,
    handleClickConfirmVariants,
    handleSelectorChange,
    ref,
    selectedPromo,
    selectors,
  };
}
