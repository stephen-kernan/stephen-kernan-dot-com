export const formatDate = (date: string): string => {
  const datetime = new Date(date);
  return datetime
    .toLocaleDateString()
    .split("/")
    .map((piece: string) => piece.padStart(Math.max(2, piece.length), "0"))
    .join("-");
};
