import Loader from '@/modules/common/components/Loader';
import useCouponsQuery from './hooks/useCouponsQuery';
import CreateListTabs from '@/modules/common/components/CreateListTabs';
import { CreateCoupon } from '@/modules/cupones/components/CreateCoupon';
import Coupon from './components/Coupon';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { CreateCouponMobile } from './components/CreateCouponMobile';

export default function CouponsPage() {
  const couponQuery = useCouponsQuery();
  const isMobile = useIsMobile();

  if (couponQuery.isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-7 justify-between w-full">
      <CreateListTabs name="cupón">
        {(createMode) =>
          createMode ? (
            isMobile ? (
              <CreateCouponMobile />
            ) : (
              <CreateCoupon />
            )
          ) : (
            <div className="flex flex-col sm:flex-row w-full gap-5 overflow-y-scroll h-full sm:overflow-x-scroll">
              {couponQuery.data?.map((coupon) => (
                <Coupon key={coupon.id} coupon={coupon} />
              ))}
            </div>
          )
        }
      </CreateListTabs>
    </section>
  );
}
