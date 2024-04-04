import { ComponentPropsWithRef, FC, useMemo, useRef } from 'react';

import { useTextarea } from '~/hooks/ui/useTextarea';

import { boldStyle, headingStyle, textareaStyle } from './style.css';

type Props = ComponentPropsWithRef<'textarea'> & {
  rows?: number;
  isHeading?: boolean;
  isBold?: boolean;
};

export const FormTextarea: FC<Props> = ({
  rows,
  isHeading = false,
  isBold = false,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const { adjustHeight } = useTextarea({ ref });

  const className = useMemo(() => {
    const classes = [textareaStyle];
    if (isHeading) classes.push(headingStyle);
    if (isBold) classes.push(boldStyle);
    return classes.join(' ');
  }, [isBold, isHeading]);

  return (
    <textarea
      rows={rows ?? 1}
      {...props}
      ref={ref}
      className={className}
      onChange={adjustHeight}
    />
  );
};
