import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

import { IconClose } from '~/assets/icons/Close';

import {
  backdropStyle,
  closeButtonStyle,
  closedStyle,
  containerStyle,
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
    <div
      className={clsx(backdropStyle, !isOpened && closedStyle)}
      onClick={onClose}
    >
      <aside className={clsx(containerStyle, className)} {...props}>
        <p className={closeButtonStyle} onClick={onClose}>
          <IconClose />
        </p>
        {children}
      </aside>
    </div>
  );
};
