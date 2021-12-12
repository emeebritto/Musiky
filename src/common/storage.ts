const tokenSlotName = "USER_SD_ACCESS";

export class DataStorage {
  constructor() {
    throw Error("No");
  }

  static set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get(key: string): any {
    const data: any = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static del(key: string): void {
    localStorage.removeItem(key);
  }

  static reset(): void {
    localStorage.clear();
  }

  static getLength(): number {
    return localStorage.length;
  }

  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(tokenSlotName, JSON.stringify(token));
    }
  }

  static hasToken(): boolean {
    if (typeof window !== 'undefined') {
      return Boolean(localStorage.getItem(tokenSlotName));
    }
    return false;
  }

  static getToken(): string {
    if (typeof window !== 'undefined') {
      const data: any = localStorage.getItem(tokenSlotName);
      return JSON.parse(data);
    }
    return '';
  }
}
