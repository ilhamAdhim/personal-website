export const textBuilder = (arr: Array<string | number | undefined | null>) => {
  return arr
    .filter((char) => typeof char === "number" || typeof char === "string")
    .join(" ");
};
