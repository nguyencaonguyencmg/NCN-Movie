import { useEffect, useState } from "react";

export default function useDebounce(initializeValue = "", delay = 1000) {
  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(initializeValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initializeValue]);
  return debounce;
}
