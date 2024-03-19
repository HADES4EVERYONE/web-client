import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;
  isLoggedIn = false;

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });}

    toggleMode(event: Event): void {
      event.preventDefault();
      this.isLoginMode = !this.isLoginMode;
    
      this.authForm.reset();
    }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      if (this.isLoginMode) {
        // Call login service
        console.log('Logging in...', this.authForm.value);
      } else {
        // Call signup service
        console.log('Signing up...', this.authForm.value);
      }
    
      this.authForm.reset();
    } else {
      console.error('Form is not valid', this.authForm.value);
    }
  }
}
