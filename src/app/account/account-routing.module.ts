import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';

const routes: Routes = [
  { path: '', component: AccountOverviewComponent },
  { path: 'details/:id', component: AccountDetailsComponent },
  { path: 'transactions/:id', component: AccountTransactionsComponent },
  { path: 'account', loadChildren: () => import('./account.module').then(m => m.AccountModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
