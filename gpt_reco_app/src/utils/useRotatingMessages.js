import { useState, useEffect, useRef } from 'react';

const DEFAULT_MESSAGES = [
  'Summoning AI',
  'Feeding hamsters',
  'Consulting oracles',
  'Tickling electrons',
  'Shaking dice',
  'Polishing pixels',
  'Untangling wires',
  'Charging creativity crystals',
  'Calibrating sarcasm detector',
  'Counting penguins',
  'Rebooting flux capacitor',
  'Tuning algorithms',
  'Petting server hamsters',
  'Firing up puns',
  'Rearranging playlists',
  'Herding rubber ducks',
  'Recycling jokes'
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function useRotatingMessages(
  isLoading,
  defaultLabel,
  messages = DEFAULT_MESSAGES,
  interval = 2000
) {
  const [label, setLabel] = useState(defaultLabel);
  const indexRef = useRef(0);
  const messagesRef = useRef(messages);

  useEffect(() => {
    if (isLoading) {
      messagesRef.current = shuffle([...messages]);
      indexRef.current = 0;
      setLabel(messagesRef.current[indexRef.current]);
      const id = setInterval(() => {
        indexRef.current = (indexRef.current + 1) % messagesRef.current.length;
        setLabel(messagesRef.current[indexRef.current]);
      }, interval);
      return () => clearInterval(id);
    }
    indexRef.current = 0;
    setLabel(defaultLabel);
  }, [isLoading, defaultLabel, messages, interval]);

  return label;
}
