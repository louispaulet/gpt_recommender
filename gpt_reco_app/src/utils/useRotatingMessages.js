import { useState, useEffect, useRef } from 'react';

const DEFAULT_MESSAGES = [
  'Summoning AI',
  'Feeding hamsters',
  'Consulting oracles',
  'Tickling electrons',
  'Shaking dice'
];

export default function useRotatingMessages(
  isLoading,
  defaultLabel,
  messages = DEFAULT_MESSAGES,
  interval = 2000
) {
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
