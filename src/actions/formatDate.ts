export const formatDate = (date: Date): string => {
  const datetime = new Date(date);
  const [day, month, year] = datetime
    .toUTCString()
    .split(" ")
    .slice(1, 4)
    .map((piece: string) => piece.padStart(Math.max(2, piece.length), "0"));

  return `${month} ${day}, ${year}`;
};
