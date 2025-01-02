export const debounce = <Args extends Array<any>>(
  fn: (...args: Args) => void,
  timeout: number
) => {
  let timeoutId: number | null = null;

  const debounced = (...args: Args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), timeout) as number;
  };

  return debounced;
};
