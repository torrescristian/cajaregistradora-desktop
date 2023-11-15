import React from 'react';
import { IProps } from '@/interfaces/Sale.interfaces';
import {
  Container,
  DateComponent,
  Divider,
  SaleItem,
  SaleItemsContainer,
  TotalItems,
} from './Sale.styles';
import { SaleContext } from '@/state/SaleContext';

export default function Sale({ sale }: IProps) {
  return (
    <SaleContext.Provider value={sale}>
      <Container>
        <Divider />
        <div className="divider">Total a pagar</div>
        <TotalItems />

        {/*TODO: ver mas */}
        <div className="flex flex-col h-80 overflow-y-auto">
          <SaleItemsContainer>
            {sale.saleItems.map((item) => (
              <SaleItem key={item.id} item={item} />
            ))}
            <Divider />
          </SaleItemsContainer>
        </div>
        <div className="divider order-first">
          <p className="text-sm font-thin flex ">ID Venta {sale.id}</p>
        </div>
        <DateComponent />
      </Container>
    </SaleContext.Provider>
  );
}
