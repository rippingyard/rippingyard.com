import axios from 'axios';
import { useEffect, useState } from 'react';

export const useUrlContent = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ogp, setOgp] = useState<{
    title: string;
    url: string;
    description: string;
    sitename: string;
    image?: {
      url: string;
      type: 'jpeg' | 'png' | 'gif';
    };
  }>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const res = await axios.get(`/api/url?url=${url}`);
      const data = res.data;

      const image = data?.image;

      setOgp({
        title: data?.title || url,
        url: data?.url || url,
        image,
        description: data?.description || '',
        sitename: data?.sitename || '',
      });

      setIsLoading(false);
    })();
  }, []);

  return { isLoading, ogp };
};
