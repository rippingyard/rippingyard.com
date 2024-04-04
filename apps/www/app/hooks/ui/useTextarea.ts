import { MutableRefObject, useCallback, useEffect } from 'react';

// import { isFirefox, isSafari } from '@inspirehigh-com/react/utils/ua';

type Args = {
  // id: string;
  rows?: number;
  ref: MutableRefObject<HTMLTextAreaElement | null>;
};

export const useTextarea = ({ rows, ref }: Args) => {
  const adjustHeight = useCallback(() => {
    if (rows) return;

    if (ref === null || !ref.current) return;

    const diff = 0;

    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight + diff}px`;

    if (ref.current.value === '') {
      ref.current.style.minHeight = 'auto';
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight + diff}px`;
      ref.current.style.minHeight = `${ref.current.scrollHeight + diff}px`;
    }
  }, [rows, ref]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, ref?.current?.scrollHeight]);

  useEffect(() => {
    window.addEventListener('resize', adjustHeight);
    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [adjustHeight]);

  return { adjustHeight };
};
