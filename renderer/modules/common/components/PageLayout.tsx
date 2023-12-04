import { mergeClasses } from '@/modules/common/libs/utils';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';

const PageLayout = ({ children, className }: IComponent) => (
  <main
    className={mergeClasses(
      'sm:mb-28 mt-28 md:mt-2 flex sm:w-full flex-col sm:items-center gap-y-5 px-5 ',
      className,
    )}
  >
    {children}
  </main>
);

export default PageLayout;
