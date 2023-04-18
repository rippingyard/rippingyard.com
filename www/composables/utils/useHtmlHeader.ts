const title = 'ripping yard';

export const useHtmlHeader = (meta: any = {}) => {
  console.log('useHtmlHeader', meta);
  useHead({
    title,
    titleTemplate: (chunk: string) => chunk && chunk !== title
      ? `${chunk} - ${title}`
      : `${title}`
    ,
    ...meta,
  });
}