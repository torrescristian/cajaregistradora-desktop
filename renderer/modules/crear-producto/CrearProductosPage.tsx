import ProductControl from "./components/ProductControl";

export default function CrearProductosPage() {

    return (
        <section className="flex w-full flex-row justify-evenly">
            <ProductControl controlType={'CREATE'} />
        </section>
    )

}