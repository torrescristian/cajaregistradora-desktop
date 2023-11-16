import useNotificationQuery from '@/hooks/services/useNotificationQuery';
import useUpadteSeenNotification from '@/hooks/services/useUpdateSeenNotification';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

export const NotificationsIcon = () => {
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
    <div className="flex justify-center gap-5 items-center">
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
    </div>
  );
};
