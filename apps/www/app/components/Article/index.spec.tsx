import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { Article } from '.';

describe('<Article />', () => {
  it('<p>段落</p>が表示されること', () => {
    render(<Article text={'<p>段落</p>'} />);
    expect(
      screen.getByText(
        (content, element) =>
          !!element &&
          element.tagName.toLowerCase() === 'p' &&
          content.startsWith('段落')
      )
    ).toBeTruthy();
  });
  it('<p><strong>強調</strong></p>が表示されること', () => {
    render(<Article text={'<p><strong>強調</strong></p>'} />);
    expect(
      screen.getByText(
        (content, element) =>
          !!element &&
          element.tagName.toLowerCase() === 'strong' &&
          content.startsWith('強調')
      )
    ).toBeTruthy();
  });
  it('URLが入力されている場合、自動的にリンクされること', () => {
    render(<Article text={'<p>https://www.rippingyard.com</p>'} />);
    expect(
      screen.getByText(
        (content, element) =>
          !!element &&
          element.tagName.toLowerCase() === 'a' &&
          content.startsWith('https://www.rippingyard.com')
      )
    ).toBeTruthy();
  });
  it('YouTubeのURLが入力されている場合、YouTubeのウィジェットが埋め込まれる', () => {
    render(
      <Article text={'<p>https://www.youtube.com/watch?v=RRPd93mCp8s</p>'} />
    );
    expect(
      screen.getByText(
        (content, element) =>
          !!element && element.tagName.toLowerCase() === 'svg'
      )
    ).toBeTruthy();
  });
});
