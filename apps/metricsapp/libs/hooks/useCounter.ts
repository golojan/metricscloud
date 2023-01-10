import React, { useState } from "react";
export const useCounter = (
  num: number
): [number, (x: number) => void, (x: number) => void] => {
  const [count, setCount] = useState<number>(num);
  const countUp = (x: number) => {
    setCount(count + x);
  };
  const countDown = (x: number) => {
    setCount(count - x);
  };
  return [count, countUp, countDown];
};
