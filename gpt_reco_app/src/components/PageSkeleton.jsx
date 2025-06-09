import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

function PageSkeleton() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 min-h-[60vh]">
      <Stack spacing={3}>
        <Skeleton variant="text" width="75%" height={40} />
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="65%" />
        </Stack>
        <Skeleton variant="rectangular" width="100%" height={250} />
      </Stack>
    </div>
  );
}

export default PageSkeleton;
