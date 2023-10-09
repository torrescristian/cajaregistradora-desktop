import { productTypes, PRODUCT_TYPE } from '@/interfaces/IProduct';
import TabButton from './TabButton';
interface IProps {
  onSelect: (type: PRODUCT_TYPE) => void;
  selectedProductType: PRODUCT_TYPE;
  showPromo?: boolean;
  setShowPromo: (showPromo: boolean) => void;
}
export default function ProductTypes({
  onSelect,
  selectedProductType,
  showPromo,
  setShowPromo,
}: IProps) {
  const handleSelect = (type: PRODUCT_TYPE) => () => {
    onSelect(type === selectedProductType ? '' : type);
    setShowPromo(false);
  };
  const handleClickPromo = () => {
    onSelect('');
    setShowPromo(!showPromo);
  };

  return (
    <section className="flex flex-row gap-5">
      <TabButton isActive={showPromo} onClick={handleClickPromo}>
        <span>Promociones</span>
      </TabButton>

      {productTypes
        .filter((t) => t)
        .map((type: PRODUCT_TYPE) => (
          <TabButton
            isActive={selectedProductType === type}
            key={type}
            onClick={handleSelect(type)}
          >
            <span>{type}</span>
          </TabButton>
        ))}
    </section>
  );
}
