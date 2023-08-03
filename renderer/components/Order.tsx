import useOrderQuery from '@/hooks/services/useOrderQuery';
import { Divider } from './Sale/Sale.styles';
import Loader from './Loader';

function Order() {
  const orderQuery = useOrderQuery();

  if (!orderQuery.data) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col items-center w-1/2 gap-5">
      <h1 className="text-2xl font-bold">✍🏻 Lista de ordenes</h1>

      {orderQuery.data.map((order) => (
        <div className="flex flex-col items-center shadow-xl w-3/5 m-3 gap-5 p-10">
          <div className="flex flex-row gap-5 m-5">
            <h2 className="font-bold text-center">Orden #{order.id} </h2>
            <button className="btn btn-outline btn-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>

            <button className="btn btn-outline btn-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
          <p className="font-bold text-xl">Nombre: {order.clientName}</p>
          <Divider />
          <p>Fecha: 12/12/2022 12:00:00hs</p>
          <Divider />
          <p>3 productos</p>
          <Divider />
          <p>2 Lomitos</p>
          <p>1 Manaos 3 lts.</p>
          <p>{order.additionalDetails}</p>
          <Divider />
          <p className="text-2xl font-bold">Total: ${order.totalPrice}</p>
          <button className="btn btn-success text-stone-50">
            Orden completada
          </button>
        </div>
      ))}
    </section>
  );
}

export default Order;
