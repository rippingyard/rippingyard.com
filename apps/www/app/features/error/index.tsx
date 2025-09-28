import { FC, ReactNode } from 'react';
import { isRouteErrorResponse } from 'react-router';

import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading';
import { containerStyle } from '~/styles/container.css';

import * as styles from './style.css';

export const ErrorComponent: FC<{ error: Error; children?: ReactNode }> = ({
  error,
  children,
}) => {
  if (children) return children;
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <Heading>
          {error.statusText || 'Error'}: {error.status}
        </Heading>
        <main className={containerStyle}>
          <Article text={`<blockquote>${error.data}</blockquote>`} />
        </main>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <Heading>Error: {error.message}</Heading>
        <main className={containerStyle}>
          <p>{error.message}</p>
          <pre className={styles.stackTrace}>{error.stack}</pre>
        </main>
      </div>
    );
  } else {
    return <Heading>Unknown Error</Heading>;
  }
};
