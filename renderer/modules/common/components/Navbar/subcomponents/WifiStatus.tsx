import useOnlineStatus from '@/modules/common/hooks/useOnlineStatus';
import { WifiIcon } from '@heroicons/react/24/solid';

export const WifiStatus = () => {
  const isOnline = useOnlineStatus();
  return (
    <div>
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
  );
};
