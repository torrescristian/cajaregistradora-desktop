export default function AddToBalance () {
    return (
        <section>
            <form className="flex flex-col gap-3">
                <input className="text-center p-3" type="number" name="" id="" placeholder="Añadir Monto"  />
                <input className="text-center p-3" type="text" name="" id=""  placeholder=" Descripción "  />
                <button className="p-3 bg-green-600"  type="submit">Añadir</button>
            </form>            
        </section>
    )
}