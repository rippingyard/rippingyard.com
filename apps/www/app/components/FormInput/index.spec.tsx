import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { FormInput } from '.';

describe('<FormInput />', () => {
  it('Inputに文字が表示されること', () => {
    render(<FormInput defaultValue="Input" />);
    expect(screen.getByRole('textbox').getAttribute('value')).toBe('Input');
  });
});
