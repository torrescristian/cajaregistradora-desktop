import { ICashBalanceExpanded } from "@/interfaces/ICashBalance";

interface IProps {
    cashBalance: ICashBalanceExpanded | null;
}

export const CashBalanceActivate = ({ cashBalance }: IProps) => {
    return (
        <section>
            <h2>Caja activa</h2>
            <div>
                <p>{cashBalance?.initialCashAmount}</p>
                <p>{cashBalance?.newCashAmount}</p>
                <p>{cashBalance?.id}</p>
            </div>
        </section>
    )
}