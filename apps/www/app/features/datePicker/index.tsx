import { FC, forwardRef, ReactElement } from 'react';
import ReactDatePicker from 'react-datepicker';

import * as styles from './style.css';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  selectedDate: Date;
  onChange: (date: Date | null) => void;
  customInput?: ReactElement;
};

export type DatePickerInputProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
};

export const DatePicker: FC<Props> = ({
  selectedDate,
  onChange,
  customInput = undefined,
}) => {
  const CustomInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
    ({ value, onClick, className }, ref) => (
      <div className={className} onClick={onClick} ref={ref}>
        {value}
      </div>
    )
  );
  CustomInput.displayName = 'CustomInput';

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      calendarClassName={styles.calendar}
      showTimeSelect
      dateFormat="yyyy-MM-dd HH:mm"
      customInput={customInput}
    />
  );
};
