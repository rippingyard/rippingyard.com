import clsx from 'clsx';
import { ComponentPropsWithRef, FC } from 'react';

import { checkedStyle, radioButtonStyle } from './style.css';

type Props = ComponentPropsWithRef<'input'>;

export const FormRadioButton: FC<Props> = ({ checked = false, ...props }) => {
  const className = clsx(radioButtonStyle, checked && checkedStyle);

  return <input type="radio" {...props} className={className} />;
};
