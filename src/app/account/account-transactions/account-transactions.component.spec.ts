import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransactionsComponent } from './account-transactions.component';

describe('AccountTransactionsComponent', () => {
  let component: AccountTransactionsComponent;
  let fixture: ComponentFixture<AccountTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountTransactionsComponent]
    });
    fixture = TestBed.createComponent(AccountTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
