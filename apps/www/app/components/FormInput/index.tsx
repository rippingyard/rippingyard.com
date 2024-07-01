import clsx from 'clsx';
import { ComponentPropsWithRef, FC } from 'react';

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
  const className = clsx(
    inputStyle,
    isHeading && headingStyle,
    isBold && boldStyle,
    hasBorder && borderStyle
  );

  return <input autoComplete="true" {...props} className={className} />;
};
