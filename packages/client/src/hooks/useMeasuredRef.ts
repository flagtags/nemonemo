import { useCallback, useState, RefObject } from 'react';

const useMeasuredRef = <T>(): [T | null, (node: T) => void] => {
  const [ref, setRef] = useState<T | null>(null);

  const memoizedSetRef = useCallback((node: T) => {
    if (node !== null) {
      setRef(node);
    }
  }, []);

  return [ref, memoizedSetRef];
};

export default useMeasuredRef;
