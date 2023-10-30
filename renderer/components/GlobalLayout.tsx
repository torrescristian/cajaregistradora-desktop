import 'react-toastify/dist/ReactToastify.css';
import { Bars3Icon, BellAlertIcon, WifiIcon } from '@heroicons/react/24/solid';
import useNavBar from './Navbar/useNavBar';
import { RenderIf } from './RenderIf';
import { useAuthState } from '@/contexts/AuthContext';
import useOnlineStatus from '@/hooks/useOnlineStatus';
import useNotificationQuery from '@/hooks/services/useNotificationQuery';
import { twMerge } from 'tailwind-merge';
import useUpadteSeenNotification from '@/hooks/services/useUpdateSeenNotification';
import DesktopMenu from './Navbar/subcomponents/DesktopMenu';
import Navbar from './Navbar/Navbar';
import CustomToastContainer from './CustomToastContainer';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {
  const { isOwner, handleLogout, isLoggedIn } = useNavBar();
  const { userData } = useAuthState();
  const isOnline = useOnlineStatus();
  const notificationQuery = useNotificationQuery();
  const updateSeenNotification = useUpadteSeenNotification();
  const notifications = notificationQuery.data;

  const newNotifications = notifications?.filter(
    (notification) => !notification.seen,
  );
  const handleSeenNotification = (id: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    updateSeenNotification.mutateAsync(id);
  };

  return (
    <div className="drawer drawer-end">
      <CustomToastContainer />
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        <RenderIf condition={isLoggedIn}>
          <div className="w-full flex flex-col gap-5 justify-between sm:mt-4 sm:flex-row sm:w-[85vw] ">
            <Navbar />
            <div className="flex flex-row justify-evenly gap-5">
              <div className="flex">
                {isOnline ? (
                  <div className="btn btn-link text-success">
                    <WifiIcon className="w-6 h-6 " />
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-error gap-3">
                    <WifiIcon className="w-6 h-6" />
                    <p className="whitespace-nowrap">Sin conexión</p>
                  </div>
                )}
              </div>
              <div className="indicator">
                <div className="dropdown dropdown-end">
                  {newNotifications?.length ? (
                    <label tabIndex={0} className="btn btn-ghost m-1">
                      <BellAlertIcon className="w-6 h-6" />
                      <span className="indicator-item badge badge-error">
                        {newNotifications?.length}
                      </span>
                    </label>
                  ) : (
                    <label className="bg-transparent btn-disabled btn">
                      <BellAlertIcon className="w-6 h-6" />
                    </label>
                  )}
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box right-10 w-56"
                  >
                    {notifications?.map((notification) => (
                      <li className="border-2" key={notification.id}>
                        <div
                          className={twMerge(
                            notification.seen
                              ? 'bg-neutral text-neutral-content'
                              : 'bg-blue-400',
                            'w-full justify-between whitespace-nowrap',
                          )}
                          onClick={handleSeenNotification(notification.id!)}
                        >
                          <p>{notification.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <label
                htmlFor="my-drawer"
                className="btn btn-secondary gap-3 drawer-button"
              >
                <Bars3Icon className="w-6 h-6" />
                <p>Menu</p>
              </label>
            </div>
          </div>
        </RenderIf>
        <section className="flex flex-col container">{children}</section>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
          <DesktopMenu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </ul>
      </div>
    </div>
  );
}
