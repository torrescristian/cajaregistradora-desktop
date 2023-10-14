import { useEffect, useState } from 'react';

export default function () {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' && navigator.onLine,
  );
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);
  return isOnline;
}
