import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private __network: NetworkService, private router: Router) { }

  @Input() item: any = {}
  @Input() options: any = {}

  public itemModal: any = {};

  ngOnInit(): void {
    console.log(this.item);
    let user = this.__network.getUser();
    if (user) {
      console.log(user);
      this.isLoggedIn = true;
    }
  }

  getImage(src: string) {
    return `${this.__network.endpoints.tmdbImage}w154/${src}`
  }

  onDetails(item: any) {
    console.log(item);
    this.router.navigate([`/item-details/${this.options.type}/${this.item.id}`])
  }

  addToWishlist(item: any): void {
    console.log('Adding to wishlist:', item);
  }

  addToWishlist(item: any): void {
    console.log('Adding to wishlist:', item);
  }
}
