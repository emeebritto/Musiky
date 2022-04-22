export class DataStorage {
  tokenSlotName: string;
  
  constructor() {
    this.tokenSlotName = "USER_SD_ACCESS";
  }

  set(key:string, data:any ='empty'): void {
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key:string): any {
    if (typeof window !== 'undefined') {
      const data:any = localStorage.getItem(key);
      return JSON.parse(data);
    }
    return false;
  }

  del(key:string): void {
    localStorage.removeItem(key);
  }

  reset(): void {
    localStorage.clear();
  }

  getLength(): number {
    return localStorage.length;
  }

  setToken(token:string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenSlotName, JSON.stringify(token));
    }
  }

  hasToken(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.tokenSlotName);
    }
    return false;
  }

  getToken(): string {
    if (typeof window !== 'undefined') {
      const data:any = localStorage.getItem(this.tokenSlotName);
      return JSON.parse(data);
    }
    return '';
  }
}

const dataStorage = new DataStorage();
export default dataStorage;
