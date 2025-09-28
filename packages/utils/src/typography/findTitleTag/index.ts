export const findTitleTag = (level?: number) =>
  new RegExp(
    level ? `<h${level}?>.*?</h${level}>` : '<h.(?: .+?)?>.*?</h.>',
    'g'
  );
