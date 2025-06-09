import React from 'react';

function LoadingSkeleton({ className = 'h-5 w-5', rounded = 'rounded-full' }) {
  return (
    <div
      role="status"
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${rounded} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSkeleton;
