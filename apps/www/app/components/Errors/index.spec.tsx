import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { Errors } from '.';

describe('<Errors />', () => {
  describe('エラーが存在しない場合', () => {
    it('何も表示されないこと', () => {
      render(<Errors errors={[]} />);
      expect(screen.queryByRole('list')).toBeFalsy();
    });
  });
  describe('エラーが存在する場合', () => {
    it('listが表示されていること', () => {
      render(<Errors errors={['エラーです']} />);
      expect(screen.getByRole('list')).toBeTruthy();
    });
    it('listItemがエラーの個数分存在すること', () => {
      render(<Errors errors={['エラーです', '2つ目のエラーです']} />);
      expect(screen.getAllByRole('listitem')).toBeTruthy();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });
});
