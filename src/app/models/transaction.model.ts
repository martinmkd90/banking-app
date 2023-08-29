export interface Transaction {
    id: number;
    date: Date;
    amount: number;
    type: string;
    description: string;
    accountId: number;
  }