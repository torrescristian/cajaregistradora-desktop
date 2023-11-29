import { useState } from 'react';
import TabButton from './TabButton';
interface IProps {
  children: (createMode: boolean) => void;
  name: string;
}

export default function CreateListTabs({ children, name }: IProps) {
  const [createMode, setCreateMode] = useState(false);

  return (
    <section className="flex flex-col sm:mt-2 mt-20 gap-5">
      <section className="flex flex-row justify-center w-full">
        <TabButton isActive={!createMode} onClick={() => setCreateMode(false)}>
          Listar {name}
        </TabButton>
        <TabButton isActive={createMode} onClick={() => setCreateMode(true)}>
          Crear {name}
        </TabButton>
      </section>
      <section className="flex flex-col w-full gap-5">
        {/* @ts-ignore */}
        {children(createMode)}
      </section>
    </section>
  );
}
