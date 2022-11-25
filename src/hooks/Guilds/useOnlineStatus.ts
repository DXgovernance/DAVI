import { useState, useEffect } from 'react';

export default function useOnlineStatus(): { isOnline: boolean } {
  const [isOnline, setIsOnline] = useState(navigator?.onLine);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsOnline(false);
    });
    window.addEventListener('online', () => {
      setIsOnline(true);
    });

    return () => {
      window.removeEventListener('offline', () => {
        setIsOnline(false);
      });
      window.removeEventListener('online', () => {
        setIsOnline(true);
      });
    };
  }, []);

  return { isOnline };
}
