import { mergeClasses } from '@/libs/utils';
import { useRouter } from 'next/router';

interface IActiveLinkProps {
  href: string;
  children: any;
  className?: string;
}

export default function ActiveLink({ children, href }: IActiveLinkProps) {
  const router = useRouter();
  const style = {
    marginRight: 10,
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={style}
      className={mergeClasses(
        'h-8 w-8 text-info',
        router.asPath === href ? 'text-secondary' : 'text-stone-400'
      )}
    >
      {children}
    </a>
  );
}
