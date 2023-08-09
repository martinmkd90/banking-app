export class Product {
    id: number;
    name: string;
    description: string;
    type: string; // e.g., 'Current account', 'Unsecured Loans', etc.
  
    constructor() {
      this.id = 0;
      this.name = '';
      this.description = '';
      this.type = '';
    }
  }
  