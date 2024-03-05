import { TablesColumn } from '../organisms/TablesColumn';
import { DeliveriesColumn } from '../organisms/DeliviriesColumn';
import { OrdersColumn } from '../organisms/OrdersColumn';

export default function NewOrdenesPage() {
  return (
    <section className="flex flex-row w-full text-center divide-x">
      <TablesColumn />
      <DeliveriesColumn />
      <OrdersColumn />
    </section>
  );
}
