import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

export function TableCard () {
    return (
        <>
            <div className="flex flex-col w-44 outline outline-green-600 rounded py-5 my-2 px-5 hover:bg-green-600 hover:text-gray-900">
                <h1>Nro Mesa : 1 </h1>
                <h2>Total : 2000 </h2>
                <EditAndDeleteButtons />
            </div>

            <div className="flex flex-col w-44 outline outline-cyan-600 rounded py-5 my-2 px-5 hover:bg-cyan-600 hover:text-gray-900">
                <h1>Nro Mesa : 2 </h1>
                <h2>Total : 4000 </h2>
            </div>
        </>
    )
}