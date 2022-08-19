/**
 * Does string 2 contain string 1?
 */
export const contains =
  (str1: string) =>
  (str2: string): boolean =>
    str2.toLowerCase().includes(str1.toLowerCase());
