export function maxBy(array: { [key: string]: any }[], key: string): { [key: string]: any } {
  return array.reduce((prev, current) => (prev[key] > current[key]) ? prev : current, {});
}

export function minBy(array: { [key: string]: any }[], key: string): { [key: string]: any } {
  return array.reduce((prev, current) => (prev[key] < current[key]) ? prev : current, {});
}