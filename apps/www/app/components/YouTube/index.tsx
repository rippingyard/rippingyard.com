import { FC, memo } from 'react';

const YouTubeComponent: FC = () => {
  return <button onClick={() => console.log('YouTube!')}>YouTube Test</button>;
};

export const YouTube = memo(YouTubeComponent);
