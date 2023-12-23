import {useEffect, useState} from 'react';

export default function useDebounce(
  value: string | number,
  delay: number = 500,
) {
  const [debounceValue, setDebounceValue] = useState<string | number>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
