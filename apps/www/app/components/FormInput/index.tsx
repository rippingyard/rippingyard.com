import clsx from 'clsx';
import { ComponentPropsWithRef, FC, useRef } from 'react';

import { boldStyle, borderStyle, headingStyle, inputStyle } from './style.css';

type Props = ComponentPropsWithRef<'input'> & {
  isHeading?: boolean;
  isBold?: boolean;
  hasBorder?: boolean;
};

export const FormInput: FC<Props> = ({
  isHeading = false,
  isBold = false,
  hasBorder = true,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const className = clsx(
    inputStyle,
    isHeading && headingStyle,
    isBold && boldStyle,
    hasBorder && borderStyle
  );

  return (
    <input autoComplete="false" ref={ref} {...props} className={className} />
  );
};
