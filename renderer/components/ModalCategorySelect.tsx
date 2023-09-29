import { ICategory } from "@/interfaces/ICategory";
import { useRef } from "react";
interface IProps{
    categories:ICategory[];
}
export const ModalCategorySelect = ({categories}:IProps) => {
    const ref = useRef<HTMLDialogElement>(null);

    const handleClickSelectCategory = (e:any) =>{
        e.preventDefault();
        ref.current?.showModal();
    }
    return (
        <section>
            <button className='btn btn-info modal-open' onClick={handleClickSelectCategory}>
                modificar categoria
            </button>
            <dialog ref={ref} className="bg-transparent p-15 w-[40vw]">
                <div>
                    {categories.map((category,index)=>(
                        <p>{category.name}</p>
                    ))}                       
                </div>
                <div className="modal-action">
                <button className="btn btn-error">Cerrar</button>
                </div>
            </dialog>
        </section>
    )
}