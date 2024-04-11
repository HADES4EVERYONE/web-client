import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProfileComponent implements OnInit {
  wishlistMovies: any[] = [];
  wishlistTVShows: any[] = [];
  wishlistGames: any[] = [];

  constructor() {}

  ngOnInit() {
  }
}
