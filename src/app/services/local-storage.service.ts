import { Injectable, KeyValueDiffers } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  Add(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  Get(key: string): string | null {
    return localStorage.getItem(key);
  }
  Remove(key: string) {
    localStorage.removeItem(key);
  }
  Clear() {
    localStorage.clear();
  }
}
