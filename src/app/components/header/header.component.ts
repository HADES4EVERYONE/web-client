import { Component, OnInit } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NetworkService } from '../../services/network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [NetworkService]
})
export class HeaderComponent implements OnInit {

  constructor(private __network: NetworkService, private router: Router) { }

  isLoggedIn: boolean = false
  loginSubscription = new Subscription()

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.__network.checkLoginStatus()
      }
    })
    this.loginSubscription = this.__network.loginStatus.subscribe(res => {
      this.isLoggedIn = res
    })
  }
}
