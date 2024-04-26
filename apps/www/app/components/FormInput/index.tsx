import clsx from 'clsx';
import { ComponentPropsWithRef, FC } from 'react';

import { boldStyle, headingStyle, inputStyle } from './style.css';

type Props = ComponentPropsWithRef<'input'> & {
  isHeading?: boolean;
  isBold?: boolean;
};

export const FormInput: FC<Props> = ({
  isHeading = false,
  isBold = false,
  ...props
}) => {
  const className = clsx(
    inputStyle,
    isHeading && headingStyle,
    isBold && boldStyle
  );

  return <input autoComplete="true" {...props} className={className} />;
};
