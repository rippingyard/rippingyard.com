import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { FormTextarea } from '.';

describe('<FormTextarea />', () => {
  it('Textareaに文字が表示されること', () => {
    render(<FormTextarea defaultValue="Textarea" />);
    expect(screen.getByText('Textarea')).toBeTruthy();
  });
  it('isHeadingの場合、headingStyleが当たっている', () => {
    render(<FormTextarea defaultValue="Textarea" isHeading={true} />);
    screen.debug();
    expect(screen.getByRole('textbox')).toHaveClass(/headingStyle/);
  });
  it('isBoldの場合、boldStyleが当たっている', () => {
    render(<FormTextarea defaultValue="Textarea" isBold={true} />);
    screen.debug();
    expect(screen.getByRole('textbox')).toHaveClass(/boldStyle/);
  });
});
