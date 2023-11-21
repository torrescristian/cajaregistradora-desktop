import { IPayment, PAYMENT_TYPE } from "@/modules/recibos/interfaces/ITicket";
import useTicketQuery from "./hooks/useTicketQuery";
import PageLayout from "@/modules/common/components/PageLayout";
import Loader from "@/modules/common/components/Loader";
import { parseDateToArgentinianFormat } from "@/modules/common/libs/utils";
import { IColumnTicket } from "./interfaces/IColumnTicket";
import TicketTable from "./components/TicketTable";

export default function RecibosPage() {

    function getLabelByPaymentsType(payments: IPayment[]) {
        if (payments.length > 1) {
            return 'Mixto';
        }
        const payment = payments[0];
        switch (payment.type) {
            case PAYMENT_TYPE.CASH:
                return 'Efectivo';
            case PAYMENT_TYPE.CREDIT:
                return 'Crédito';
            case PAYMENT_TYPE.DEBIT:
                return 'Débito';
            default:
                return '';
        }
    }

    const ticketQuery = useTicketQuery();
    if (ticketQuery.isLoading)
        return (
            <PageLayout>
                <Loader />
            </PageLayout>
        );
    if (ticketQuery.isError)
        return (
            <PageLayout>
                <p>Error</p>
            </PageLayout>
        );

    const data = ticketQuery.data.map(
        (ticket) =>
            ({
                client: ticket.order?.client?.name,
                date: parseDateToArgentinianFormat(ticket.order?.createdAt),
                direction: ticket.order?.client?.address,
                state: ticket.status,
                ticket,
                subtotalPrice: ticket.order?.subtotalPrice,
                totalPrice: ticket.totalPrice,
                phone_number: ticket.order?.client?.phone_number,
                paymentType: getLabelByPaymentsType(ticket.payments),
            }) as IColumnTicket,
    );

    return (
        <PageLayout className="grid grid-cols-3 gap-5 justify-center overflow-x-scroll ">
            <TicketTable data={data} />
        </PageLayout>
    )
}