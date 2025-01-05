import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  FC,
  KeyboardEvent,
  useCallback,
  useRef,
} from 'react';

import { dummyTextboxStyle, textboxStyle } from './style.css';

type Props = ComponentPropsWithRef<'input'> & {
  hasBorder?: boolean;
  isTyping: boolean;
};

const minWidth = 80;

export const FormElasticInput: FC<Props> = ({
  onKeyDown: onKeyDownByUser,
  isTyping,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const presenterRef = useRef<HTMLInputElement>(null);

  const className = clsx(textboxStyle);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDownByUser) onKeyDownByUser(e);

      if (isTyping) return;

      const key = e.key.toLowerCase();

      if (inputRef.current && key === 'enter') inputRef.current.value = '';
    },
    [isTyping, onKeyDownByUser]
  );

  return (
    <>
      <input
        ref={inputRef}
        autoComplete="false"
        type="text"
        className={className}
        {...props}
        onKeyDown={onKeyDown}
        style={{
          width:
            (presenterRef.current?.clientWidth &&
            presenterRef.current?.clientWidth > minWidth
              ? presenterRef.current?.clientWidth
              : minWidth) + 20,
          minWidth,
        }}
      />
      <span ref={presenterRef} aria-hidden="true" className={dummyTextboxStyle}>
        {inputRef?.current && inputRef?.current.value}
      </span>
    </>
  );
};
