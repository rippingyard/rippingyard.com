import { ComponentPropsWithRef, FC, useMemo } from 'react';

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
  const className = useMemo(() => {
    const classes = [inputStyle];
    if (isHeading) classes.push(headingStyle);
    if (isBold) classes.push(boldStyle);
    return classes.join(' ');
  }, [isBold, isHeading]);

  return <input autoComplete="true" {...props} className={className} />;
};
