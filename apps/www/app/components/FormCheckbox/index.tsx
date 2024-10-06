import clsx from 'clsx';
import { ComponentPropsWithRef, FC } from 'react';

import { IconCheck } from '~/assets/icons/Check';

import { checkboxStyle, checkedStyle } from './style.css';

type Props = ComponentPropsWithRef<'input'>;

export const FormCheckbox: FC<Props> = ({ onClick, ...props }) => {
  const className = clsx(checkboxStyle, props?.checked && checkedStyle);

  return (
    <div className={className} onClick={onClick}>
      <IconCheck />
      <input autoComplete="true" type="checkbox" {...props} />
    </div>
  );
};
