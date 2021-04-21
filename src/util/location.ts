interface Search {
  [key: string]: string;
}

export function parseURLSearch(search: string): Search  {
  const searchParams = new URLSearchParams(search);
  const map = {};
  for (const [key, value] of searchParams) {
    map[key] = value;
  }
  return map;
}
