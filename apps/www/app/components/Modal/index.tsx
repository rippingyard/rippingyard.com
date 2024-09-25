import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

import { IconClose } from '~/assets/icons/Close';

import {
  backdropStyle,
  closeButtonStyle,
  closedStyle,
  containerStyle,
  innerStyle,
  wrapperStyle,
} from './style.css';

type Props = ComponentPropsWithoutRef<'div'> & {
  isOpened: boolean;
  onClose: () => void;
};

export const Modal: FC<Props> = ({
  children,
  className,
  isOpened = false,
  onClose = () => undefined,
  ...props
}) => {
  return (
    <div className={clsx(wrapperStyle, !isOpened && closedStyle)}>
      <aside className={clsx(containerStyle, className)} {...props}>
        <p className={closeButtonStyle} onClick={onClose}>
          <IconClose />
        </p>
        <div className={innerStyle}>{children}</div>
      </aside>
      <div className={clsx(backdropStyle)} onClick={onClose} />
    </div>
  );
};
