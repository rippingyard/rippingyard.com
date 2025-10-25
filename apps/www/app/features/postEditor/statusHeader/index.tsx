import clsx from 'clsx';
import { Dispatch, FC, forwardRef, SetStateAction } from 'react';

import {
  containerStyle,
  addTitleStyle,
  itemStyle,
  dateStyle,
} from './style.css';
import { DatePicker, DatePickerInputProps } from '../../datePicker';

type Props = {
  hasTitle: boolean;
  setHasTitle: Dispatch<SetStateAction<boolean>>;
  publishedAt: Date;
  onChangeDate?: (date: Date | null) => void;
};

const CustomInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  ({ value, onClick }, ref) => (
    <div className={clsx(dateStyle)} onClick={onClick} ref={ref}>
      {value}
    </div>
  )
);
CustomInput.displayName = 'CustomInput';

export const StatusHeader: FC<Props> = ({
  publishedAt = new Date(),
  hasTitle,
  setHasTitle,
  onChangeDate = () => undefined,
}) => {
  return (
    <ul className={containerStyle}>
      <li className={itemStyle}>
        {(hasTitle && (
          <span className={addTitleStyle} onClick={() => setHasTitle(false)}>
            タイトルを削除
          </span>
        )) || (
          <span className={addTitleStyle} onClick={() => setHasTitle(true)}>
            タイトルを付ける
          </span>
        )}
      </li>
      <li className={clsx(itemStyle)}>
        <DatePicker
          selectedDate={publishedAt}
          onChange={onChangeDate}
          customInput={<CustomInput />}
        />
      </li>
    </ul>
  );
};
