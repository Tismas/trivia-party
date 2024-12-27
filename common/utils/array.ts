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

export const shuffle = <T>(array: Array<T>): Array<T> => {
  const copy: Array<T> = [...array];
  const result: Array<T> = [];

  while (result.length != array.length) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(...copy.splice(index, 1));
  }

  return result;
};
