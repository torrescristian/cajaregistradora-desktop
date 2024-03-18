import { useState } from 'react';
import TabButton from '../atoms/TabButton';
interface ITab {
  label: string;
  component: React.ReactNode;
}

interface IProps {
  tabs: ITab[];
}
export default function CreateListTabs({ tabs }: IProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <section className="flex flex-col sm:mt-2 mt-20 gap-5">
      <section className="flex flex-row justify-center w-full">
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            isActive={index === activeTabIndex}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </TabButton>
        ))}
      </section>
      <section className="flex flex-col w-full gap-5">
        {tabs[activeTabIndex].component}
      </section>
    </section>
  );
}
