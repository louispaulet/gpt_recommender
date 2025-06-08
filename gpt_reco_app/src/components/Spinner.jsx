import React from 'react';
import { ClipLoader } from 'react-spinners';

function Spinner({ className = 'mr-2', size = 20, color = 'currentColor' }) {
  return (
    <ClipLoader
      className={className}
      size={size}
      color={color}
      aria-label="Loading Spinner"
    />
  );
}

export default Spinner;
