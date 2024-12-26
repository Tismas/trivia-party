export const pick = <T>(array: Array<T>, amount: number): Array<T> => {
  if (amount > array.length) {
    throw new Error("Picking more elements than array have");
  }

  const result = [...array];

  while (result.length > amount) {
    const index = Math.floor(Math.random() * result.length);
    result.splice(index, 1);
  }

  return result;
};
