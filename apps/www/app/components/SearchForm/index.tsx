import { Form } from '@remix-run/react';
import { FC } from 'react';

import { containerStyle } from './style.css';
import { FormInput } from '../FormInput';

type Props = {
  query: string;
};

export const SearchForm: FC<Props> = ({ query = '' }) => {
  return (
    <Form className={containerStyle}>
      <FormInput name="query" defaultValue={query} />
    </Form>
  );
};
