import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NetworkService]
})
export class HomeComponent implements OnInit {
  constructor(private __network: NetworkService) { }

  public popularMovieSubscription = new Subscription();

  ngOnInit() {
    this.popularMovieSubscription = this.__network.getPopularMovies().subscribe((res: any) => console.log(res));
  }
}
