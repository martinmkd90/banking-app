import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z]+$')]]
  });
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.login();
  }

  login(): void {
    this.isLoading = true;
    const loginData = this.loginForm.value;
    this.authService.login(loginData.username, loginData.password).subscribe({
      next: response => {
        this.isLoading = false;
        this.successMessage = 'Login successful! Redirecting...';
        setTimeout(() => {
          this.successMessage = null;
        }, 2500);
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.isLoading = false;
        if (error.error.error && error.error.error.code) {
          this.errorMessage = error.error.error.message;
        }
        setTimeout(() => {
          this.errorMessage = null;
        }, 2500);
      }
    });
  }  
}
