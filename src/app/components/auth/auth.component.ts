import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;
  isLoggedIn = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode(event: Event): void {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      console.log(this.isLoginMode ? 'Logging in...' : 'Signing up...', this.authForm.value);
      this.authForm.reset();
    } else {
      console.error('Form is not valid', this.authForm.value);
    }
  }
}
