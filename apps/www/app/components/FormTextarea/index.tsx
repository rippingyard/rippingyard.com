import clsx from 'clsx';
import {
  ChangeEvent,
  ComponentPropsWithRef,
  FC,
  useCallback,
  useRef,
} from 'react';

import { useTextarea } from '~/hooks/ui/useTextarea';

import {
  boldStyle,
  headingStyle,
  noBorderStyle,
  textareaStyle,
} from './style.css';

type Props = ComponentPropsWithRef<'textarea'> & {
  rows?: number;
  isHeading?: boolean;
  isBold?: boolean;
  isNoBorder?: boolean;
};

export const FormTextarea: FC<Props> = ({
  rows,
  isHeading = false,
  isBold = false,
  isNoBorder = false,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const { adjustHeight } = useTextarea({ ref });

  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (props.onChange) props.onChange(event);
      adjustHeight();
    },
    [adjustHeight, props]
  );

  const className = clsx(
    textareaStyle,
    isHeading && headingStyle,
    isBold && boldStyle,
    isNoBorder && noBorderStyle
  );

  return (
    <textarea
      rows={rows ?? 1}
      {...props}
      ref={ref}
      className={className}
      onChange={onChange}
    />
  );
};
