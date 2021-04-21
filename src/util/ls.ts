// get 从ls取数据，若数据过期，则清理
export function get(key: string): any {
  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return null;
  }

  let result;

  try {
    const { value, time } = JSON.parse(raw);

    if (!time || time < Date.now()) {
      result = value;
    } else {
      clear(key);
      result = null;
    }
  } catch (e) {
    result = null;
  }

  return result;
};

// set 往ls存数据，expire为数据保存的秒数
export function set(key: string, value: any, expire?: number): void {
  const time = expire ? (Date.now() + expire * 1000) : 0;

  const raw = JSON.stringify({
    value,
    time,
  });

  window.localStorage.setItem(key, raw);
};

export function clear(key: string): void {
  window.localStorage.removeItem(key);
};
