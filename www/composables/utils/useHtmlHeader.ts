import { useGtm } from "@gtm-support/vue-gtm";

const title = 'ripping yard';

export const useHtmlHeader = (meta: any = {}) => {
  console.log('useHtmlHeader', meta);

  const gtm = useGtm();

  useHead({
    title,
    titleTemplate: (chunk: string) => chunk && chunk !== title
      ? `${chunk} - ${title}`
      : `${title}`
    ,
    ...meta,
  });
  console.log('useHead', {
    title,
    titleTemplate: (chunk: string) => chunk && chunk !== title
      ? `${chunk} - ${title}`
      : `${title}`
    ,
    ...meta,
  });

  if (gtm) {
    gtm.trackEvent({
      event: 'config',
      page_title: document.title,
    });
  }
}