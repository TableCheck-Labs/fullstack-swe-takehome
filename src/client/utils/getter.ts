type AnyObject = {
  [key: string]: unknown;
};

const get = <T>(obj: AnyObject, path: string, defaultValue?: T): T | undefined => {
  const keys = path.split('.');
  let current: AnyObject | undefined = obj;

  for (const key of keys) {
    if (current && typeof current === 'object') {
      if (/\[\d+\]/.test(key)) {
        const index = parseInt(key.match(/\[(\d+)\]/)![1], 10);
        if (Array.isArray(current) && index >= 0 && index < current.length) {
          current = current[index];
        } else {
          return defaultValue;
        }
      } else if (key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    } else {
      return defaultValue;
    }
  }

  return current !== undefined ? (current as T) : defaultValue;
};


export default get;
