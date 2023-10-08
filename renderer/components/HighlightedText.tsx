import { IComponent } from '@/interfaces/ProductItem.interfaces';

const HighlightedText = ({ children }: IComponent) => {
  return (
    <p className="font-bold text-xl text-base-content rounded-lg p-2 whitespace-nowrap text-center gap-2 bg-neutral">
      {children}
    </p>
  );
};

export default HighlightedText;
