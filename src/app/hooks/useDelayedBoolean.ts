import { useEffect, useState } from 'react';

export const useDelayedBoolean = (value: boolean, delay = 150) => {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    if (value && !delayedValue) {
      const timeout = setTimeout(() => setDelayedValue(true), delay);
      return () => clearTimeout(timeout);
    }

    if (!value && delayedValue) {
      const timeout = setTimeout(() => setDelayedValue(false), delay);
      return () => clearTimeout(timeout);
    }
  }, [value, delayedValue, delay]);

  return delayedValue;
};
