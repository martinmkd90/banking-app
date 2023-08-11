import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required, noSpecialCharsValidator],
    password: ['', Validators.required],
    email: ['', Validators.required]
  });
  errorMessage: string | null = null;
  successMessage: string | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    const controlOptions: AbstractControlOptions = {
      validators: this.passwordMatchValidator
    };
    
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, noSpecialCharsValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, controlOptions);
  }
  

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please correct the errors and try again.';
      setTimeout(() => {
        this.errorMessage = null;
      }, 2500);
      return;
    }
    const registerData = this.registerForm.value;
    this.authService.register(registerData.username, registerData.password, registerData.email).subscribe({
      next: response => {
        this.successMessage = 'Registration successful! Please login.';
        setTimeout(() => {
          this.successMessage = null;
        }, 2500);
      },
      error: error => {
        if (error.error.error && error.error.error.code) {
          switch (error.error.error.code) {
            case 'USERNAME_EXISTS':
              this.errorMessage = error.error.error.message;
              break;
            case 'EMAIL_EXISTS':
              this.errorMessage = error.error.error.message;
              break;            
          }
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
        setTimeout(() => {
          this.errorMessage = null;
        }, 2500);
      }
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const password = formGroup.controls['password']?.value;
    const confirmPassword = formGroup.controls['confirmPassword']?.value;
  
    if (password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }
  
}

function noSpecialCharsValidator(control: FormControl) {
  const regex = /^[a-zA-Z0-9]*$/;
  if (!regex.test(control.value)) {
    return { 'specialChars': true };
  }
  return null;
}
