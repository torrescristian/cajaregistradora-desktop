import { ButtonAdd } from './ButtonAdd';

export function OrdersColumn () {
    return (
        <div className='flex flex-col w-full item-center gap-3 px-5'>
        <h1 className='whitespace-nowrap'>Pedidos a retirar</h1>
        <ButtonAdd />
      </div>
    )
}