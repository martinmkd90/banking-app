import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly apiUrl = 'http://localhost:7078/api';

  getApiUrl(): string {
    return this.apiUrl;
  }
}
