export const isSPA = (request: Request) =>
  request.headers.get('X-Requested-With') === 'XMLHttpRequest' ||
  request.headers.get('Purpose') === 'prefetch';
