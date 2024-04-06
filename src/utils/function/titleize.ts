export function titleize(str: string) {
  return str.toLowerCase().replace(/(?:^|\s|-)\S/g, function (c) {
    return c.toUpperCase();
  });
};
