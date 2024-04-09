import { twMerge } from 'tailwind-merge';

const Footer = ({ className }: { className?: string }) => {
  const year = new Date().getFullYear();
  return (
    <footer
      className={twMerge(
        'fixed bottom-0 left-0 z-30 flex w-full items-center justify-center bg-stone-200 py-3',
        className,
      )}
    >
      <p className="text-sm text-gray-400">© {year} Carpincho Digital</p>
    </footer>
  );
};

export default Footer;
