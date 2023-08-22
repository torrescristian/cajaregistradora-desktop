import { twMerge } from "tailwind-merge";

export const DataItem = ({
    label,
    value,
    defaultValue,
    className,
}: {
    label: string;
    value?: any;
    defaultValue: string;
    className?: string;
}) => {
    return (
        <p className={twMerge("flex flex-row gap-2",
            className
        )}>
            {value ? <dt className="text-stone-500">{label}</dt> : null}
            {value ? (
                <dd>{value}</dd>
            ) : (
                <dd className="text-stone-500">{defaultValue}</dd>
            )}
        </p>
    );
};