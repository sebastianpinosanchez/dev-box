export function readSetting<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`devbox:${key}`);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
}
export function writeSetting(key: string, value: unknown) {
  try {
    localStorage.setItem(`devbox:${key}`, JSON.stringify(value));
  } catch {
    /* Storage can be unavailable in private or restricted sessions. */
  }
}
