import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardRowComponent } from '../card-row/card-row.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardRowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NetworkService]
})
export class HomeComponent implements OnInit {
  constructor(private __network: NetworkService) {
  }

  loading = {
    movieItems: false,
    tvItems: false,
    gameItems: false
  }

  public popularMovieSubscription = new Subscription();
  public popularGamesSubsrciption = new Subscription();
  public popularTvSubscription = new Subscription();
  movieItems: any = [];
  gameItems: any = [];
  tvItems: any = [];




  ngOnInit() {
    this.popularMovieSubscription = this.__network.getPopularMovies().subscribe((res: any) => {
      this.loading.movieItems = true;
      this.movieItems = res.results;
    });

    this.popularGamesSubsrciption = this.__network.getPopularGames().subscribe((res: any) => {
      this.loading.tvItems = true;
      this.gameItems = res.results;
    })

    this.popularTvSubscription = this.__network.getPopularTv().subscribe((res: any) => {
      this.loading.gameItems = true;
      this.tvItems = res.results;
    })
  }
}
