import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [
    AccountOverviewComponent,
    AccountDetailsComponent,
    AccountTransactionsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
