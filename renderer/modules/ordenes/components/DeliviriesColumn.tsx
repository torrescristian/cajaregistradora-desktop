import { ButtonAdd } from './ButtonAdd';

export function DeliveriesColumn () {
    return(
        <div className='flex flex-col w-full item-center gap-3 px-5'>
        <h1>Deliveries</h1>
        <ButtonAdd />
      </div>
    )
}