export function createSectionListArray(data: IContact[]): { title: string; data: IContact[] }[] {
  const grouped = data.reduce((acc: Record<string, IContact[]>, item) => {
    const key: string = item.firstName.charAt(0).toUpperCase();
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return Object.keys(grouped).sort().map(key => ({
    title: key,
    data: grouped[key].sort((a, b) => a.firstName.localeCompare(b.firstName))
  }));
}
