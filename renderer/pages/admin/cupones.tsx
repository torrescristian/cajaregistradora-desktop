import Coupon from '@/components/Coupons/Coupon';
import { CreateCoupon } from '@/components/Coupons/CreateCoupon';
import CreateListTabs from '@/components/CreateListTabs';
import Loader from '@/components/Loader';
import useCouponsQuery, {
  useCouponOffline,
} from '@/hooks/services/useCouponsQuery';
import useOnlineStatus from '@/hooks/useOnlineStatus';

const Cupones = () => {
  const isOnline = useOnlineStatus();

  const couponQuery = useCouponsQuery();
  const couponOffline = useCouponOffline();

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
              {isOnline
                ? couponQuery.data?.map((coupon) => (
                    <Coupon key={coupon.id} coupon={coupon} />
                  ))
                : couponOffline?.map((coupon) => (
                    <Coupon key={coupon.id} coupon={coupon} />
                  ))}
            </div>
          )
        }
      </CreateListTabs>
    </section>
  );
};

export default Cupones;
