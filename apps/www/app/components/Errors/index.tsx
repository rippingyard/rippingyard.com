import { FC } from 'react';

import { containerStyle } from './style.css';

type Props = {
  errors: string[];
};

export const Errors: FC<Props> = ({ errors = [] }) => {
  if (errors.length === 0) return;

  return (
    <ul className={containerStyle}>
      {errors.map((e, i) => (
        <li key={`login-formError-${i}`}>{e}</li>
      ))}
    </ul>
  );
};
