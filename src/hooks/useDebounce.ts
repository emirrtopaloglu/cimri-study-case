import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value === "") {
      setDebouncedValue("");
      return;
    } else if (value.length < 3) {
      return;
    }
    
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
