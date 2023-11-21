import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import React, { useRef, useEffect } from 'react';

type IProps = {
  ref: any;
  callback: any;
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter({ callback, ref }: IProps) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(
  props: IComponent & {
    callback: () => void;
  },
) {
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    callback: props.callback,
  });

  return <div ref={wrapperRef}>{props.children}</div>;
}
