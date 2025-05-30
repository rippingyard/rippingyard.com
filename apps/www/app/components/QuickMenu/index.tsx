import { FC, RefAttributes } from 'react';
import { Link, LinkProps } from 'react-router';

import {
  containerStyle,
  itemCaptionStyle,
  itemLabelStyle,
  itemStyle,
  labelStyle,
} from './style.css';

export type MenuItem = LinkProps &
  RefAttributes<HTMLAnchorElement> & {
    label: string;
    caption?: string;
  };

export const QuickMenu: FC<{
  links: MenuItem[];
  label?: string;
  prefix?: string;
}> = ({ links, label, prefix = 'quickmenu' }) => {
  return (
    <>
      {label && <label className={labelStyle}>{label}</label>}
      <ul className={containerStyle}>
        {links.map(({ label, caption, ...props }, i) => (
          <li className={itemStyle} key={`${prefix}-${i}`}>
            <Link prefetch="viewport" {...props}>
              <h3 className={itemLabelStyle}>{label}</h3>
              {caption && <p className={itemCaptionStyle}>{caption}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
