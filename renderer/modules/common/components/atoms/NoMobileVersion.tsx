import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';

export default function NoMobileVersion() {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="alert alert-warning">
      ¡Estamos mejorando para ti! La versión móvil de nuestra página está en
      camino. Mientras tanto, te invitamos a explorar desde tu notebook o PC
      para disfrutar al máximo de nuestras funciones. ¡Gracias por tu paciencia!{' '}
    </div>
  );
}
