export const contains = (query: string) => (str: string) =>
  str.toLowerCase().includes(query.toLowerCase());
