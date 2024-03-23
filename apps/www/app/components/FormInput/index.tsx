import { ComponentPropsWithRef, FC } from 'react';

import { inputStyle } from './style.css';

type Props = ComponentPropsWithRef<'input'>;

export const FormInput: FC<Props> = (props) => {
  return <input autoComplete="true" {...props} className={inputStyle} />;
};
