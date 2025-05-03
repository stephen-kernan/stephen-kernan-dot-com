export const slugifyTitle = (title: string): string => {
  return title.toLowerCase().replaceAll(" ", "-");
};
