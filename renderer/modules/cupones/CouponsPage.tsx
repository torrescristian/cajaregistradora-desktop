import Loader from '@/modules/common/components/Loader';
import useCouponsQuery from './hooks/useCouponsQuery';
import CreateListTabs from '@/modules/common/components/CreateListTabs';
import { CreateCoupon } from '@/modules/cupones/components/CreateCoupon';
import Coupon from './components/Coupon';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { CreateCouponMobile } from './components/CreateCouponMobile';
import CouponTable from './components/CouponTable';
import { ICoupon } from './interfaces/ICoupon';

export default function CouponsPage() {
  const couponQuery = useCouponsQuery();
  const isMobile = useIsMobile();

  if (couponQuery.isLoading) return <Loader />;
  const data = couponQuery?.data?.map(
    (coupon) =>
      ({
        id: coupon.id,
        availableUses: coupon.availableUses,
        code: coupon.code,
        discount: coupon.discount,
        maxAmount: coupon.maxAmount,
        variant: coupon.variant,
        dueDate: coupon.dueDate,
      }) as ICoupon,
  );

  if (couponQuery.isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-7 justify-between w-full">
      <CreateListTabs
        tabs={[
          {
            label: 'Crear cupón',
            component: isMobile ? <CreateCouponMobile /> : <CreateCoupon />,
          },
          {
            label: 'Cupones',
            component: isMobile ? (
              couponQuery.data?.map((coupon) => (
                <Coupon key={coupon.id} coupon={coupon} />
              ))
            ) : (
              <CouponTable coupon={data!} />
            ),
          },
        ]}
      ></CreateListTabs>
    </section>
  );
}
