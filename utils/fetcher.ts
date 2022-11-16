export const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init);
  if (res.status >= 400) {
    throw new Error("An error occured while fetching data");
  }
  return res.json();
};
