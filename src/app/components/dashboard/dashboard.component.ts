import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName!: string;
  accounts!: any[];
  recentTransactions!: any[];
  isLoading: boolean = true;  // Track loading state
  error: string | null = null;  // Track errors

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const userId = 1; // Placeholder. In a real-world scenario, get this from the authentication service.

    // Fetch all required data in parallel using forkJoin
    forkJoin([
      this.dashboardService.getUserDetails(userId),
      this.dashboardService.getUserAccounts(userId),
      this.dashboardService.getRecentTransactions(userId)
    ]).subscribe({
      next: data => {
        const [user, accounts, transactions] = data;
        this.userName = user.name;
        this.accounts = accounts;
        this.recentTransactions = transactions;
        this.isLoading = false;  // Update loading state
      },
      error: err => {
        this.error = "An error occurred while fetching the data.", err;  // Handle errors
        this.isLoading = false;  // Update loading state
      }
    });    
  }
}
