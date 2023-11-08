import { IVariant } from '@/interfaces/IVariants';
import { create } from 'zustand';

type IVariantUpdatePrice = {
  variants: IVariant[];
  addVariant: (variant: IVariant) => void;
  removeVariant: (variantId: number) => void;
};

export const useVariantsStore = create<IVariantUpdatePrice>()((set) => ({
  variants: [],
  addVariant: (variant: IVariant) =>
    set((state) => ({ variants: [...state.variants, variant] })),
  removeVariant: (variantId: number) =>
    set((state) => ({
      variants: state.variants.filter((variant) => variant.id !== variantId),
    })),
}));

export const addVariantSelector = (state: IVariantUpdatePrice) =>
  state.addVariant;
export const removeVariantSelector = (state: IVariantUpdatePrice) =>
  state.removeVariant;
export const variantsSelector = (state: IVariantUpdatePrice) => state.variants;
