import { useState, useEffect, useRef } from 'react';

export default function useRotatingMessages(isLoading, defaultLabel, messages, interval = 2000) {
  const [label, setLabel] = useState(defaultLabel);
  const indexRef = useRef(0);

  useEffect(() => {
    if (isLoading) {
      setLabel(messages[indexRef.current]);
      const id = setInterval(() => {
        indexRef.current = (indexRef.current + 1) % messages.length;
        setLabel(messages[indexRef.current]);
      }, interval);
      return () => clearInterval(id);
    }
    indexRef.current = 0;
    setLabel(defaultLabel);
  }, [isLoading, defaultLabel, messages, interval]);

  return label;
}
