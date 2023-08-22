import IClient from "@/interfaces/IClient";
import useClientsQuery from "@/hooks/services/useClientQuery";
import Loader from "./Loader";

interface IProps {
    onChange: (selectedClient: IClient | null) => void;
    selectedClientId:number;
}

export default function SelectClient({ selectedClientId, onChange }: IProps) {

    const clientsQuery = useClientsQuery();


    const handleChangeClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clientId = Number(e.target.value);
        const selectedClient = clientsQuery.data!.find((client) => client.id === clientId)!
        onChange(selectedClient)
    }


    if (clientsQuery.isLoading) {
        return <Loader />
    }

    if (clientsQuery.isError) {
        return <p>Error</p>
    }

    return (
        <select defaultValue={selectedClientId} className="select-bordered w-80 select " onChange={handleChangeClient} >
            <option value={0}>👤 Usuario anonimo</option>
            {clientsQuery.data?.map((client) =>
                <option key={client.id} value={client.id}>👤 {client.name}</option>
            )}
        </select>
    )
}
