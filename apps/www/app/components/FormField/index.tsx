import { FC, ReactNode } from 'react';

import { createToken } from '~/utils';

import { containerStyle, errorContainerStyle, labelStyle } from './style.css';

export const FormField: FC<{
  label?: string;
  errors?: string[];
  id?: string;
  children: ReactNode;
}> = ({ label, children, errors, id = createToken(14) }) => {
  return (
    <div className={containerStyle}>
      {label && (
        <label className={labelStyle} htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {errors && errors.length > 0 && (
        <ul className={errorContainerStyle}>
          {errors.map((error, i) => (
            <li key={`form-${id}-error-${i}`}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
