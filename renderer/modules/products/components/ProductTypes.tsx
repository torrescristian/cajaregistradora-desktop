import { IProductType } from '@/modules/products/interfaces/IProduct';
import TabButton from '@/modules/common/components/atoms/TabButton';
import useProductTypeQuery from '@/modules/products/hooks/useProductTypesQuery';
import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import { FunnelIcon } from '@heroicons/react/24/solid';
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
  const productTypes = productsTypes.data || [];

  const isMobile = useIsMobile();
  const handleSelect = (type: IProductType | null) => () => {
    onSelect(type?.id === selectedProductType ? null : type);
    if (showPromo) {
      setShowPromo(false);
    }
  };

  const handleClickPromo = () => {
    if (selectedProductType) {
      onSelect(null);
    }
    setShowPromo(!showPromo);
  };

  return (
    <section className="flex flex-col sm:flex-row items-center">
      {isMobile ? (
        <RenderIf condition={productTypes?.length}>
          <div className="dropdown z-1">
            <label tabIndex={0} className="btn btn-secondary m-1">
              <FunnelIcon className="w-5 h-5 text-secondary-content" />
            </label>
            <div
              tabIndex={0}
              className="dropdown-content flex flex-col p-2 bg-neutral overflow-y-scroll h-[40vh] shadow rounded-box w-64"
            >
              <TabButton
                className="btn-secondary"
                isActive={selectedProductType === null}
                onClick={handleSelect(null)}
              >
                <span>Todos</span>
              </TabButton>
              <TabButton
                className="btn-secondary"
                isActive={showPromo}
                onClick={handleClickPromo}
              >
                <span>Promociones</span>
              </TabButton>
              {productTypes
                ?.filter((t) => t)
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
            </div>
          </div>
        </RenderIf>
      ) : (
        <>
          <TabButton
            className="btn-secondary"
            isActive={selectedProductType === null}
            onClick={handleSelect(null)}
          >
            <span>Todos</span>
          </TabButton>
          <TabButton
            className="btn-secondary"
            isActive={showPromo}
            onClick={handleClickPromo}
          >
            <span>Promociones</span>
          </TabButton>
          <RenderIf condition={productTypes?.length <= 3}>
            {productTypes
              ?.filter((t) => t)
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
          </RenderIf>
          <RenderIf condition={productTypes?.length > 3}>
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn flex-nowrap gap-3 btn-secondary m-1"
              >
                <FunnelIcon className="w-5 h-5" /> Filtrar
              </label>
              <div
                tabIndex={0}
                className="dropdown-content flex flex-col z-30 w-64 right-0"
              >
                {productTypes
                  ?.filter((t) => t)
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
              </div>
            </div>
          </RenderIf>
        </>
      )}
    </section>
  );
}
