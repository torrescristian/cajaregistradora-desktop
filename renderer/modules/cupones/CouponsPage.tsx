import Loader from "@/modules/common/components/Loader";
import useCouponsQuery from "./hooks/useCouponsQuery";
import CreateListTabs from "@/modules/common/components/CreateListTabs";
import { CreateCoupon } from "@/modules/cupones/components/CreateCoupon";
import Coupon from "./components/Coupon";

export default function CouponsPage() {

    const couponQuery = useCouponsQuery();

    if (couponQuery.isLoading) {
        return <Loader />;
    }

    return (

        <section className="flex flex-col gap-7 justify-between w-full">
            <CreateListTabs name="cupón">
                {(createMode) =>
                    createMode ? (
                        <CreateCoupon />
                    ) : (
                        <div className="flex gap-4 overflow-x-scroll">
                            {couponQuery.data?.map((coupon) => (
                                <Coupon key={coupon.id} coupon={coupon} />
                            ))}
                        </div>
                    )
                }
            </CreateListTabs>
        </section>
    )
}