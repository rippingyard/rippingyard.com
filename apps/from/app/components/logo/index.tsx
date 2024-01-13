﻿import { SerializedStyles } from '@emotion/react';
import { FC } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

export const Logo: FC<{
  style?: SerializedStyles;
}> = ({ style }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="400px"
      height="400px"
      viewBox="-1 -1 400 400"
      overflow="visible"
      enableBackground="new -1 -1 400 400"
      css={style}
    >
      <path
        d="M398,199.005C398,308.899,308.916,398,199.01,398C89.103,398,0,308.899,0,199.005
  C0,89.111,89.103,0,199.01,0C308.916,0,398,89.111,398,199.005z"
        fill="currentColor"
      />
      <path
        d="M292.165,361.101c-1.808,0.389-6.607,0.447-7.541,0.447c-78.978,0-143.002-47.749-143.002-106.633
  c0-58.903,64.024-106.642,143.002-106.642c29.034,0,56.047,6.491,78.59,17.568l15.527-14.157
  c-28.237-10.805-60.225-16.897-94.117-16.897c-92.785,0-171.249,45.64-197.241,108.468c-18.239-19.278-49.721-37.963-80.893-48.642
  c0.029,3.08,0.331,11.408,1.341,20.92c33.154,16.917,52.889,42.336,52.889,74.712c0,10.417-2.157,20.405-6.044,29.772
  c35.292,39.917,86.849,65.414,144.333,65.142C253.842,384.887,285.674,365.92,292.165,361.101z"
        fill="#FFFFFF"
      />
    </svg>
  );
};
