const baseUrl = import.meta.env.VITE_API_URL;

export default async function doFetch({
  url,
  method = 'GET',
  payload,
}) {
  let response;

  let options = {};
  options = {
    ...options,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    options = { ...options, body: JSON.stringify(payload) };
  }
  try {
    response = await fetch(baseUrl + url, options);
  } catch (error) {
    throw new Error(
      error?.message ?? 'something went wrong',
      error?.code,
      error?.statusText,
    );
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data?.message ?? 'Something went wrong',
      data?.statusCode,
      data?.error,
    );
  }
  return data;
}