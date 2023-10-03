import { useGtm } from "@gtm-support/vue-gtm";

const defaultTitle = 'ripping yard';

export const useHtmlHeader = (meta: any = {}) => {
  const gtm = useGtm();

  const header = {
    title: defaultTitle,
    titleTemplate: (chunk: string) => chunk && chunk !== defaultTitle
      ? `${chunk} - ${defaultTitle}`
      : `${defaultTitle}`
    ,
    ...meta,
  };

  useHead(header);

  if (gtm) {
    gtm.trackEvent({
      event: 'config',
      page_title: document.title,
    });
  }
}