import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { ConfigService } from '../config.service';
import { TransactionResponse } from '../models/PagedTransactionResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.apiUrl = `${configService.getApiUrl()}/transactions`;
  }

  getTransactions(page: number = 1, pageSize: number = 10): Observable<TransactionResponse> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<TransactionResponse>(`${this.apiUrl}/transactions`, { params });
}
}
