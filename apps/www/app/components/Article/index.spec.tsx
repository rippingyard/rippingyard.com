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
  it('URLが入力されている場合、すべてのURLが自動的にリンクされること', () => {
    render(
      <Article
        text={
          '<p>1. 平文普通のやつ：https://www.rippingyard.com</p><p>2. 改行直後<br>https://www.rippingyard.com</p><p>3. liの中：</p><ul><li>https://www.rippingyard.com</li></ul><p>4: URLとリンク先が一緒<br><a href="https://www.rippingyard.com">https://www.rippingyard.com</a></p><p>5. URLとリンク先が異なる<br><a target="_blank" rel="noopener noreferrer nofollow" href="https://www2.rippingyard.com">https://www.rippingyard.com</a></p>'
        }
      />
    );
    expect(
      screen.queryAllByText(
        (content, element) => !!element && element.tagName.toLowerCase() === 'a'
      ).length
    ).toBe(5);
  });
  // TODO: 修正する
  // it.skip('URLとリンク先が異なる場合、リンク先が変化しないこと', () => {
  //   render(
  //     <Article
  //       text={
  //         '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www2.rippingyard.com">https://www.rippingyard.com</a></p>'
  //       }
  //     />
  //   );
  //   expect(
  //     screen.queryByText(
  //       (content, element) =>
  //         !!element &&
  //         element.tagName.toLowerCase() === 'a' &&
  //         element.getAttribute('href') === 'https://www2.rippingyard.com'
  //     )
  //   ).toBeTruthy();
  // });
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
