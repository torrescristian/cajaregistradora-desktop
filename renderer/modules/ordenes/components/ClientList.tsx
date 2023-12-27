import IClient from '@/modules/cart/interfaces/IClient';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface IProps {
  client: IClient;
}

export default function ClientList({ client }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse bg-base-200">
      <input
        type="checkbox"
        value={String(isOpen)}
        onChange={handleChangeOpen}
      />
      <div className="collapse-title flex flex-row items-center gap-3">
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}{' '}
        Ver Cliente
      </div>
      <ul className="collapse-content">
        {client === null ? (
          <p>👤 Consumidor Final</p>
        ) : (
          <div>
            <p>👤 {client.name}</p>
            <p>🏠 {client.address}</p>
            <p>📲 {client.phone_number}</p>
          </div>
        )}
      </ul>
    </div>
  );
}
