import { useAuthState } from '@/contexts/AuthContext';

export default function Navbar() {
  const { userData } = useAuthState();

  return (
    <nav>
      <section className='w-full flex flex-col items-center gap-1 mt-3'>
        <h2 className="font-bold whitespace-nowrap">Caja Registradora</h2>
        <h3 className="text-sm text-center">{userData?.username}</h3>
      </section>
    </nav>
  );
}
