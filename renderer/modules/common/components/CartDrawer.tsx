import CartMobile from "@/modules/cart/components/CartMobile"

export const CartDrawer = () => {


    return (
        <div className="drawer-side">
            <label
                htmlFor="carrito-drawer"
                aria-label="cerrar sidebar"
                className="drawer-overlay">
            </label>
            <ul className="menu bg-base-200 p-5 text-base-content w-[80vw]">
                {/* Sidebar content here */}
                <CartMobile />
            </ul>
        </div>
    )
}