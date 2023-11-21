import CreateListTabs from "@/modules/common/components/CreateListTabs";
import RenderPromos from "./components/RenderPromo";
import { CreatePromo } from "./components/CreatePromo";
import usePromoQuery from "@/modules/promos/hooks/usePromoQuery";
import { useSearchProps } from "@/modules/common/components/SearchInput";

export default function PromoPage() {
    const searchProps = useSearchProps();
    const promoQuery = usePromoQuery({
        query: searchProps.query,
    });
    const promos = promoQuery.data;

    if (!promos) {
        return null;
    }
    return (
        <CreateListTabs name="promo">
            {(createMode: boolean) =>
                createMode ? (
                    <CreatePromo />
                ) : (
                    <RenderPromos
                        promosItems={promos.map((promo) => ({
                            promo,
                            selectedVariants: [],
                        }))}
                    />
                )
            }
        </CreateListTabs>
    )
}