import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'YOUR_BACKEND_API_URL';

  constructor(private http: HttpClient) { }

  getUserDetails(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  getUserAccounts(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/accounts`);
  }

  getRecentTransactions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/transactions/recent`);
  }
}
