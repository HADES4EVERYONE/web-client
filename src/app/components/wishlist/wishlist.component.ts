import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../services/network.service';
import { CardRowComponent } from '../card-row/card-row.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  standalone: true,
  imports: [CommonModule, CardRowComponent],
  providers: [NetworkService]
})
export class WishlistComponent implements OnInit {
  wishlistMovies: any[] = [];
  wishlistTVShows: any[] = [];
  wishlistGames: any[] = [];

  loadedState = {
    m: false,
    t: false,
    g: false
  }

  constructor(private __network: NetworkService) { }

  getAsyncObj(idArr: any, type: string) {
    let obj: any = {}
    switch (type) {
      case 'm':
        idArr.forEach((id: string) => {
          obj[id] = this.__network.getMovieDetails(id)
        })
        return obj
      case 't':
        idArr.forEach((id: string) => {
          obj[id] = this.__network.getTvDetails(id)
        })
        return obj
      case 'g':
        idArr.forEach((id: string) => {
          obj[id] = this.__network.getGameDetails(id)
        })
        return obj
      default:
        return;
    }
  }

  ngOnInit() {
    this.__network.getUserWishList().subscribe((res: any) => {
      if (res.data) {
        let mids = res.data.filter((i: any) => i.type === 'm').map((i: any) => i.item_id)
        let tids = res.data.filter((i: any) => i.type === 't').map((i: any) => i.item_id)
        let gids = res.data.filter((i: any) => i.type === 'g').map((i: any) => i.item_id)

        this.__network.getParallelData(this.getAsyncObj(mids, 'm')).subscribe((response: any) => {
          Object.keys(response).forEach(r => {
            this.wishlistMovies.push(response[r]);

          })

          this.loadedState.m = true;
        })

        this.__network.getParallelData(this.getAsyncObj(tids, 't')).subscribe((response: any) => {
          Object.keys(response).forEach(r => {
            this.wishlistTVShows.push(response[r]);
          })

          this.loadedState.t = true;
        })

        this.__network.getParallelData(this.getAsyncObj(gids, 'g')).subscribe((response: any) => {
          Object.keys(response).forEach(r => {
            this.wishlistGames.push(response[r]);
          })

          this.loadedState.g = true;
        })
      }
    })
  }
}
