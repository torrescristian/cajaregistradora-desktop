export const CreatePromo = () =>{
    return (
        <section className="flex flex-col w-full">
            <div className="bg-green-500">
            <form>
                <div>
                    <label>Nombre</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Descripcion</label>
                    <input type="text" />
                </div>
            </form>
            </div>
        </section>
    )
}