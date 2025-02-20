import clsx from 'clsx';
import { ComponentProps, ComponentPropsWithRef, FC } from 'react';
import { Link as ReactLink } from 'react-router';

import {
  boldStyle,
  buttonStyle,
  colorNormalStyle,
  colorSuccessStyle,
  colorWarningStyle,
  colorWeakStyle,
  largeStyle,
  normalStyle,
  smallStyle,
  underlineStyle,
  xSmallStyle,
} from './style.css';

type Props = ComponentPropsWithRef<'a'> &
  ComponentProps<typeof ReactLink> & {
    size?: 'normal' | 'large' | 'small' | 'x-small';
    color?: 'normal' | 'success' | 'weak' | 'warning';
    isBold?: boolean;
    isButton?: boolean;
    hasUnderline?: boolean;
  };

export const Link: FC<Props> = ({
  size = 'normal',
  color = 'normal',
  isBold = false,
  isButton = false,
  hasUnderline = false,
  ...props
}) => {
  const sizeStyle =
    (size === 'large' && largeStyle) ||
    (size === 'small' && smallStyle) ||
    (size === 'x-small' && xSmallStyle) ||
    normalStyle;

  const colorStyle =
    (color === 'warning' && colorWarningStyle) ||
    (color === 'success' && colorSuccessStyle) ||
    (color === 'weak' && colorWeakStyle) ||
    colorNormalStyle;

  return (
    <ReactLink
      className={clsx(
        sizeStyle,
        colorStyle,
        isBold && boldStyle,
        isButton && buttonStyle,
        hasUnderline && underlineStyle
      )}
      {...props}
    />
  );
};
