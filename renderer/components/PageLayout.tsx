import { mergeClasses } from '@/libs/utils';
import { IComponent } from '@/interfaces/ProductItem.interfaces';

const PageLayout = ({ children, className }: IComponent) => (
  <main
    className={mergeClasses(
      'container mb-28 flex w-full flex-col items-center gap-y-5 px-5 ',
      className ? className : 'max-w-lg'
    )}
  >
    {children}
  </main>
);

export default PageLayout;
