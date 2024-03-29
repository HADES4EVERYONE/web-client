import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-genres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-genres.component.html',
  styleUrl: './user-genres.component.scss',
  providers: [NetworkService]
})
export class UserGenresComponent implements OnInit {

  genreSubscription = new Subscription

  allGenres: any = {
    movieGenres: [],
    tvGenres: [],
    gameGenres: []
  }

  constructor(private __network: NetworkService) { }

  ngOnInit(): void {
    // get all genres
    this.genreSubscription = this.__network.getAllGenres().subscribe((res: any) => {
      this.allGenres.movieGenres = res[0].genres.map((g: any) => { return { ...g, isSelected: false } });
      this.allGenres.tvGenres = res[1].genres.map((g: any) => { return { ...g, isSelected: false } });
      this.allGenres.gameGenres = res[2].results.map((g: any) => { return { ...g, isSelected: false } })

    })
  }
}
