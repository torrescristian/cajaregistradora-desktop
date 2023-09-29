import { CreateCategories } from "@/components/CreateCategories";
import { CreatePromo } from "@/components/Promo/CreatePromo";
import RenderPromos from "@/components/Promo/RenderPromo";
import usePromoQuery from "@/hooks/services/usePromoQuery";

const Promo = () => {
    const promoQuery = usePromoQuery();
    const promos = promoQuery.data;

    if (!promos) {
        return null;
    }
    return (
        <section className="flex flex-col w-full gap-5">
            <div className="flex flex-col justify-between gap-3">
                <CreatePromo />
                <CreateCategories />
            </div>
            <RenderPromos promos={promos} />
        </section>
    )
}

export default Promo;