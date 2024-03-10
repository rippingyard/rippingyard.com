import { FC } from 'react';

import { loaderStyle } from './style.css';

export const LoaderIcon: FC = () => {
  return (
    <svg
      version="1.1"
      className={loaderStyle}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 52 52"
      // style={{enableBackground: 'new 0 0 52 52'}}
    >
      <path
        className="loading__front"
        d="M51,26c0,13.8-11.2,25-25,25S1,39.8,1,26S12.2,1,26,1S51,12.2,51,26z"
      />
      <path
        className="loading__back"
        d="M51,26c0,13.8-11.2,25-25,25S1,39.8,1,26S12.2,1,26,1S51,12.2,51,26z"
      />
    </svg>
  );
};
