import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe } from 'vitest';

import { ComboBox } from '.';

const entities = ['Apple', 'Banana', 'Coconut'];
const onSelectItem = (entity: string) => console.log('entity', entity);

describe('<ComboBox />', () => {
  it('初期段階ではリストが表示されていない', async () => {
    render(<ComboBox tags={entities} onSelectItem={onSelectItem} />);

    expect(screen.queryByRole('list')).not.toBeTruthy();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
  it('「House」と入力すると一件の候補が表示される', async () => {
    const user = userEvent.setup();

    render(<ComboBox tags={entities} onSelectItem={onSelectItem} />);

    await user.type(screen.getByRole('textbox'), 'House');

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
  it('「App」と入力すると二件の候補が表示される', async () => {
    const user = userEvent.setup();

    render(<ComboBox tags={entities} onSelectItem={onSelectItem} />);

    await user.type(screen.getByRole('textbox'), 'App');

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
  it('「App」と入力して二度下キーを叩くと、二つ目の候補が選択されている', async () => {
    const user = userEvent.setup();

    render(<ComboBox tags={entities} onSelectItem={onSelectItem} />);

    await user.type(screen.getByRole('textbox'), 'App');
    await user.keyboard('[ArrowDown>2]');

    expect(
      screen.getAllByRole('listitem')[0].getAttribute('class')
    ).not.toMatch(/focusedEntityStyle/);
    expect(screen.getAllByRole('listitem')[1].getAttribute('class')).toMatch(
      /focusedEntityStyle/
    );
  });
  it('「 House」と入力すると、半角スペースを取り除いた候補が表示される', async () => {
    const user = userEvent.setup();

    render(<ComboBox tags={entities} onSelectItem={onSelectItem} />);

    await user.type(screen.getByRole('textbox'), ' House');

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')[0].textContent).toBe('House');
  });
  it('「House 」と入力すると、半角スペースを取り除いた候補が表示される', async () => {
    const user = userEvent.setup();

    render(<ComboBox tags={entities} onSelectItem={onSelectItem} />);

    await user.type(screen.getByRole('textbox'), 'House ');

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')[0].textContent).toBe('House');
  });
});
