import { mergeClasses } from '@/modules/common/libs/utils';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';

const PageLayout = ({ children, className }: IComponent) => (
  <main
    className={mergeClasses(
      'mb-28 flex sm:w-full flex-col sm:items-center gap-y-5 px-5 ',
      className,
    )}
  >
    {children}
  </main>
);

export default PageLayout;
