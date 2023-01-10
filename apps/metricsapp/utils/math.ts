export const add = (a: number, b: number) => {
  return (a + b).toFixed(2);
};
export const sub = (a: number, b: number) => {
  return (a - b).toFixed(2);
};
export const mul = (a: number, b: number) => {
  return (a * b).toFixed(2);
};
export const div = (a: number, b: number) => {
  return (a / b).toFixed(2);
};
export const perc = (num: number, total: number) => {
  return ((num / total) * 100).toFixed(2);
};
