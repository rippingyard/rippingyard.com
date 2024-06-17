import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { alertStyle, containerStyle, hiddenStyle } from './style.css';

type Props = {
  info?: string;
  alert?: string;
};

export const Snackbar: FC<Props> = ({ info, alert }) => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'info' | 'alert'>('info');

  useEffect(() => {
    setMessage(alert || info || '');
    setType(alert ? 'alert' : 'info');
  }, [alert, info]);

  useEffect(() => {
    if (!message) return;
    setTimeout(() => setMessage(''), 5000);
  }, [message]);

  return (
    <div
      className={clsx([
        containerStyle,
        type === 'alert' && alertStyle,
        !message && hiddenStyle,
      ])}
      onClick={() => setMessage('')}
    >
      {message}
    </div>
  );
};
