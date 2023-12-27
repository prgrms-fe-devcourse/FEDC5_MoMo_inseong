const store = window.localStorage;

export const getItem = (key: string, defaultValue?: unknown) => {
  try {
    const storedValue = store.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue) as unknown;
    }
    return defaultValue;
  } catch (err) {
    console.error(err);
    return defaultValue;
  }
};

export const setItem = (key: string, value: unknown) => {
  try {
    store.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};
