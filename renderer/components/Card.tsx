
interface IProps {
    children: any;
    tabIndex?: number;
}

export const Card = ({children, tabIndex}: IProps) => {
    return (
        <section className="flex flex-col relative p-4 rounded-3xl items-center justify-between shadow-sm shadow-neutral border-2">
            {children}
        </section>
    )
}