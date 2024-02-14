import { FC, memo } from 'react';

export type Env = {
  NODE_ENV: string;
  VITE_GA_ADSENSE_ID: string;
};

const EnvComponent: FC<{
  env: Env;
}> = ({ env }) => {
  // const [showEnv, setShowEnv] = useState(false);

  // useEffect(() => {
  //   if (!env) return;
  //   setShowEnv(true);
  // }, [env]);

  // if (!showEnv) return;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.env = ${JSON.stringify(env)}; console.log('window.env', window.env)`,
      }}
    />
  );
};

export const Env = memo(EnvComponent);
