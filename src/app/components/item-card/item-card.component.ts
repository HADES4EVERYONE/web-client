import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  providers: [NetworkService]
})
export class ItemCardComponent implements OnInit {
  isLoggedIn = false;

  constructor(private __network: NetworkService) { }

  @Input() item: any = {}
  @Input() options: any = {}

  ngOnInit(): void {
    console.log(this.item);
    let user = this.__network.getUser();
    if (user) {
      console.log(user);
      this.isLoggedIn = true;
    }
  }

  getImage(src: string) {
    return `${this.__network.endpoints.tmdbImage}w185/${src}`
  }

  addToWishlist(item: any): void {
    console.log('Adding to wishlist:', item);
  }
}
