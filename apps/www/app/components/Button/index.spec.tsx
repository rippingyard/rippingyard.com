import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { Button } from '.';

describe('<Button />', () => {
  it('Buttonに文字が表示されること', () => {
    render(<Button>Button</Button>);
    expect(screen.getByText('Button')).toBeTruthy();
  });
  it('Buttonロールであること', async () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button').textContent).toBe('Button');
  });
});
