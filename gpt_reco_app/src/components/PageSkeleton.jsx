import React from 'react';

function PageSkeleton() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 min-h-[60vh] bg-gray-100">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 rounded w-3/4" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="h-64 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default PageSkeleton;
