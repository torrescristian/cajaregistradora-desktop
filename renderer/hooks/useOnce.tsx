import { useRef } from 'react';

const useOnce = (fn: () => void, conditions: boolean[]) => {
  const ref = useRef(false);

  if (conditions.every((c) => c) && !ref.current) {
    fn();
    ref.current = true;
  }

  return ref.current;
};

export default useOnce;
