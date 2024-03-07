import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { ISubMenuProps } from '@/modules/common/interfaces/INavbar';
import NavButton from './NavButton';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { ChangeTheme } from '../ChangeTheme';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import OutsideAlerter from '../../OutsideAlerter';
import { useDrawerStore } from '@/modules/common/contexts/useDrawerStore';
import {
  CAJA_URL,
  CREAR_PRODUCTOS_URL,
  CUPONES_URL,
  ESTADISTICAS_URL,
  DEPOSITAR_URL,
  GASTOS_URL,
  ORDENES_URL,
  PEDIDOS_URL,
  PROMO_URL,
  REABASTECER_URL,
  RECIBOS_URL,
} from '@/modules/common/consts';

const Menu = ({ onLogout, isLoggedIn }: ISubMenuProps) => {
  const { isOwner } = useAuthState();
  const isMobile = useIsMobile();
  const { closeDrawer } = useDrawerStore();
  return (
    <section className="flex flex-col items-center space-x-4 menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
      <OutsideAlerter callback={closeDrawer}>
        {isLoggedIn && (
          <ul>
            {isMobile ? (
              <ul>
                <NavButton className="w-full" href={PEDIDOS_URL}>
                  Pedidos
                </NavButton>
                <NavButton className="w-full" href={ORDENES_URL}>
                  Ordenes pendientes
                </NavButton>
              </ul>
            ) : null}
            <NavButton className="w-full" href={RECIBOS_URL}>
              Recibos
            </NavButton>
            <NavButton className="w-full" href={CAJA_URL}>
              Caja
            </NavButton>
            {isOwner ? (
              <>
                <NavButton className="w-full" href={REABASTECER_URL}>
                  Reabastecer
                </NavButton>

                <NavButton className="w-full" href={CREAR_PRODUCTOS_URL}>
                  Crear Producto
                </NavButton>

                <NavButton className="w-full" href={CUPONES_URL}>
                  Cupones
                </NavButton>

                <NavButton className="w-full" href={PROMO_URL}>
                  Promos
                </NavButton>
                <NavButton className="w-full" href={DEPOSITAR_URL}>
                  Depositar
                </NavButton>
                <NavButton className="w-full" href={GASTOS_URL}>
                  Gastos
                </NavButton>
                <NavButton className="w-full" href={ESTADISTICAS_URL}>
                  Estadísticas
                </NavButton>
              </>
            ) : null}

            <NavButton
              className="w-full bg-red-800 hover:bg-red-500"
              onClick={onLogout}
            >
              Cerrar Sesión
            </NavButton>
            <li>
              <a
                className="w-full justify-center"
                href="https://wa.me/+5493513863151?text=Hola,%20estoy%20teniendo%20un%20problema%20con%20la%20aplicaci%C3%B3n%20Caja%20Registradora.%20Necesito%20soporte%20t%C3%A9cnico.%20%C2%BFPodr%C3%ADas%20ayudarme%3F"
                target="_blank"
              >
                <PhoneIcon className="w-6 h-6 text-success" />{' '}
                <p className="font-bold text-success">Atención al cliente</p>
              </a>
            </li>
            <li className="w-full justify-center">
              <ChangeTheme />
            </li>
          </ul>
        )}
      </OutsideAlerter>
    </section>
  );
};

export default Menu;
