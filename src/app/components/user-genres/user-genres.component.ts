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
    let user = this.__network.getUser();

    if (user.model && user.model.genres) {
      let userSelectedGenres = user.model;
    }

    this.genreSubscription = this.__network.getAllGenres().subscribe((res: any) => {
      this.allGenres.movieGenres = res[0].genres.map((g: any) => {
        return { ...g, isSelected: false, type: 'm', weight: 0 }
      });
      this.allGenres.tvGenres = res[1].genres.map((g: any) => { return { ...g, isSelected: false, type: 't', weight: 0 } });
      this.allGenres.gameGenres = res[2].results.map((g: any) => { return { ...g, isSelected: false, type: 'g', weight: 0 } })
    })


  }

  saveSelectedGenres() {
    let selectedGenres = [
      ...this.allGenres.movieGenres.filter((g: any) => g.isSelected).map((g: any) => { return { name: g.name, id: g.id, type: g.type } }),
      ...this.allGenres.tvGenres.filter((g: any) => g.isSelected).map((g: any) => { return { name: g.name, id: g.id, type: g.type } }),
      ...this.allGenres.gameGenres.filter((g: any) => g.isSelected).map((g: any) => { return { name: g.name, id: g.id, type: g.type } })
    ]
    let user = this.__network.getUser()
    user.model = {
      genres: selectedGenres
    };
    this.__network.storeUser(user)
  }
}
