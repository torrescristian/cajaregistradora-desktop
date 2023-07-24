const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 z-30 flex w-full items-center justify-center bg-stone-200 py-3">
      <p className="text-sm text-gray-400">
        © {year}{' '}
        <a
          href="https://carpinchodigital.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Carpincho Digital
        </a>
      </p>
    </footer>
  );
};

export default Footer;
