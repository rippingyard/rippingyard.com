import { FC } from 'react';
import ContentLoader from 'react-content-loader';

import { vars } from '~/styles/theme.css';

type Props = {
  width: number | string;
  height: number | string;
  circle?: boolean;
  radius?: number | string;
  opacity?: number;
};

export const Skelton: FC<Props> = ({
  width,
  height,
  circle,
  radius = 8,
  opacity = 0.5,
}) => (
  <ContentLoader
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    backgroundOpacity={opacity}
    foregroundOpacity={opacity}
    speed={2}
    backgroundColor={vars.color['neutral-20']}
    foregroundColor={vars.color['background-20']}
  >
    {circle ? (
      <circle cx="50%" cy="50%" r="50%" />
    ) : (
      <rect
        x="0"
        y="0"
        rx={`${radius}`}
        ry={`${radius}`}
        width={`${width}`}
        height={`${height}`}
      />
    )}
  </ContentLoader>
);
