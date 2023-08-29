import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  profileForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  previewImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe({
     next: response => {
        this.profileForm.patchValue(response);
      },
      error: error => {
        this.errorMessage = 'Failed to load profile data. Please try again.';
      }
    }
    );
  }
  updateProfile(): void {
    if (this.profileForm.valid) {
      this.authService.updateUserProfile(this.profileForm.value).subscribe(
        () => {
          alert('Profile updated successfully');
        },
        error => {
          alert('There was an error updating the profile');
          console.error(error);
        }
      );
    }
  }
  onSubmit(): void {
  if (this.profileForm.invalid) {
    this.errorMessage = 'Please fill out the form correctly.';
    return;
  }

  const formData = new FormData();
  const profileData = this.profileForm.value;
  for (const key in profileData) {
    if (profileData.hasOwnProperty(key)) {
      formData.append(key, profileData[key]);
    }
  }

  const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (file) {
    formData.append('profilePicture', file, file.name);
  }

  this.authService.updateUserProfile(formData).subscribe({
    next: response => {
      this.successMessage = 'Profile updated successfully!';
      this.errorMessage = null;
    },
    error: error => {
      this.errorMessage = 'Failed to update profile. Please try again.';
      this.successMessage = null;
    }
  });
}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
