import { getAddPromo, useCartStore } from '@/contexts/CartStore';
import { IPromo } from '@/interfaces/IPromo';
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
    addPromo({ promo, selectedVariants: promo.variants.map((v) => v.variant) });
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
    const selectorsId = Object.values(selectors).map(Number);
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
