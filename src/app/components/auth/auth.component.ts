import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../services/network.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;
  isLoggedIn = false;

  constructor(private formBuilder: FormBuilder, private __network: NetworkService, private router: Router) { }

  ngOnInit(): void {
    let user = this.__network.getUser();
    if (user) {
      if (user && user.model && user.model.length) {
        this.router.navigate(['home'])
      } else {
        this.router.navigate(['home'])
        // this.router.navigate(['user-genres'])
      }
    }

    this.authForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });


  }

  toggleMode(event: Event): void {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      if (!this.isLoggedIn) {
        this.__network.storeUser({ ...this.authForm.value, model: {} })
        this.authForm.reset();
        this.router.navigate(['user-genres'])
      }
    } else {
      console.error('Form is not valid', this.authForm.value);
    }
  }
}
