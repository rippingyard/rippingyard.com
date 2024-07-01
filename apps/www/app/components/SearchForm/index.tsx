import { Form } from '@remix-run/react';
import { FC } from 'react';

import { IconSearch } from '~/assets/icons/Search';

import { buttonContainerStyle, containerStyle } from './style.css';
import { Button } from '../Button';
import { FormInput } from '../FormInput';

type Props = {
  query: string;
};

export const SearchForm: FC<Props> = ({ query = '' }) => {
  return (
    <Form className={containerStyle}>
      <FormInput name="query" hasBorder={false} defaultValue={query} />
      <div className={buttonContainerStyle}>
        <Button>
          <IconSearch />
        </Button>
      </div>
    </Form>
  );
};
