import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WishlistComponent implements OnInit {
  wishlistMovies: any[] = [];
  wishlistTVShows: any[] = [];
  wishlistGames: any[] = [];

  constructor() {}

  ngOnInit() {
  }
}
