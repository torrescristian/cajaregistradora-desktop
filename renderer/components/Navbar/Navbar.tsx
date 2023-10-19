import { useAuthState } from '@/contexts/AuthContext';

export default function Navbar() {
  const { userData } = useAuthState();

  return (
    <nav>
      <section>
        <h2 className="font-bold">Caja Registradora</h2>
        <h3 className="text-sm text-center">{userData?.username}</h3>
      </section>
    </nav>
  );
}
