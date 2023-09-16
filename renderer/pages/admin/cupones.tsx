import Coupon from "@/components/Coupons/Coupon";
import { CreateCoupon } from "@/components/Coupons/CreateCoupon";
import Loader from "@/components/Loader";
import useCouponQuery from "@/hooks/services/useCouponQuery";

const Cupones =() =>{
    const couponQuery = useCouponQuery();
    
    if (couponQuery.isLoading){
        return (
            <Loader />
        )
    }

    return (
        <section className="flex flex-row gap-4 justify-between w-full">
            <CreateCoupon  />
            <div className="flex flex-col gap-4 overflow-y-scroll">
            {couponQuery.data?.map((coupon) => (
                <Coupon coupon={coupon}/>
                ))}
            </div>
        </section>
    )

}

export default Cupones;