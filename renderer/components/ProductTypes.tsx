import { IProductType } from '@/interfaces/IProduct';
import TabButton from './TabButton';
import useProductTypeQuery from '@/hooks/services/useProductTypesQuery';
interface IProps {
  onSelect: (type: IProductType | null) => void;
  selectedProductType: number;
  showPromo?: boolean;
  setShowPromo: (showPromo: boolean) => void;
}
export default function ProductTypes({
  onSelect,
  selectedProductType,
  showPromo,
  setShowPromo,
}: IProps) {
  const productsTypes = useProductTypeQuery();
  const productTypes = productsTypes.data;
  const handleSelect = (type: IProductType) => () => {
    onSelect(type.id === selectedProductType ? null : type);
    setShowPromo(false);
  };

  const handleClickPromo = () => {
    onSelect(null);
    setShowPromo(!showPromo);
  };

  return (
    <section className="flex flex-row gap-5">
      <TabButton
        className="btn-secondary"
        isActive={showPromo}
        onClick={handleClickPromo}
      >
        <span>Promociones</span>
      </TabButton>
       {productTypes?.filter((t) => t)
        .map((type: IProductType) => (
          <TabButton
            className="btn-accent"
            isActive={selectedProductType === type.id}
            key={type.id}
            onClick={handleSelect(type)}
          >
            <span>{type.name}</span>
          </TabButton>
        ))} 
    </section>
  );
}
