import { Component, OnInit } from '@angular/core';
import { TransactionResponse } from 'src/app/models/PagedTransactionResponse.model';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactionsResponse: TransactionResponse[] = [];
  totalTransactions = 100;  // This should be dynamically set based on the total number of transactions from the backend.
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(response => {
      this.transactionsResponse = response.transactions;
      this.totalTransactions = response.totalTransactions;
    });
}


  pageChanged(event: any) {
    // Fetch the transactions for the given page and pageSize
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.fetchTransactions(pageIndex, pageSize);
  }
  fetchTransactions(page: number, pageSize: number) {
    this.transactionService.getTransactions(page, pageSize).subscribe(response => {
      this.transactions = response.transactions;
      this.totalTransactions = response.transaction;
    });
}
}

