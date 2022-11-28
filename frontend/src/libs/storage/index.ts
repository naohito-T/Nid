/**
 * @desc localStorageから読み出す。
 */
export const loadLocalStorage = <T>(key: string): T | null => {
  if (!window.localStorage) return null;
  const item = localStorage.getItem(key);
  return item && item !== 'null' ? (JSON.parse(item) as T) : null;
};

/**
 * @desc localStorageに指定のkeyで値を保存する。
 */
export const saveLocalStorage = <T>(key: string, value: T): void => {
  if (!window.localStorage) return;
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @desc 指定のkeyでlocalStorageに保存されている値を削除する。
 */
export const removeLocalStorage = (key: string): void => {
  if (!window.localStorage) return;
  localStorage.removeItem(key);
};

/**
 * @desc sessionStorageから指定のkeyで値を取得する。
 */
export const loadSessionStorage = (key: string): string | null => {
  if (!window.sessionStorage) return null;
  return window.sessionStorage.getItem(key);
};

/**
 * @desc sessionStorageに指定のkeyで値を保存する。
 */
export const saveSessionStorage = (key: string, value: string): void => {
  if (!window.sessionStorage) return;
  window.sessionStorage.setItem(key, value);
};

/**
 * @desc 指定のkeyでsessionStorageに保存されている値を削除する。
 */
export const removeSessionStorage = (key: string): void => {
  if (!window.sessionStorage) return;
  window.sessionStorage.removeItem(key);
};
