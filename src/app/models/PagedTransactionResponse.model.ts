import { Transaction } from "./transaction.model";

export interface TransactionResponse {
    transaction: Transaction;
    totalCount: number;
    transactions: Transaction[];
  }
  