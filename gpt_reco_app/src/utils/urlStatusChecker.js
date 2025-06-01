export async function checkUrlStatus(url) {
  const proxyUrl = 'https://head-checker.louispaulet13.workers.dev/?url=' + url;
  try {
    const response = await fetch(proxyUrl, { method: 'GET' });
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error('Error fetching URL status:', error);
    return null; // network error or other
  }
}

export function getStatusStyle(status) {
  if (status === 200) {
    return {
      liClass: 'p-3 border border-green-500 rounded bg-green-100 flex items-center justify-between',
      icon: 'verified',
    };
  } else if (status === 404) {
    return {
      liClass: 'p-3 border border-gray-400 rounded bg-gray-200 text-gray-500 flex items-center justify-between',
      icon: 'error',
    };
  } else if (status) {
    return {
      liClass: 'p-3 border border-green-300 rounded bg-green-50 text-orange-600 flex items-center justify-between',
      icon: 'warning',
    };
  } else {
    // status null or undefined, loading or error
    return {
      liClass: 'p-3 border border-gray-300 rounded bg-gray-50 flex items-center justify-between',
      icon: null,
    };
  }
}
