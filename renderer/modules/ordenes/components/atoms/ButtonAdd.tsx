import Link from 'next/link';

export const ButtonAdd = ({ isTakeAwayOpen }) => {
  const handleClick = () => {
    // Aquí puedes usar todos los estados pasados como props según sea necesario
    if (isTakeAwayOpen) {
      // Lógica para manejar el estado isTakeAwayOpen
      isTakeAwayOpen(true);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Link href="/pedidos">
        <button className="btn btn-outline text-base-content w-32" onClick={handleClick}>+</button>
      </Link>
    </div>
  );
};
