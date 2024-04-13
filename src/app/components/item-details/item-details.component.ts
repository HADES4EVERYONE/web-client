import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
  providers: []
})
export class ItemDetailsComponent implements OnInit {

  public itemDetails: any = {};

  public isLoggedIn = false;

  public totalRating = 0;

  public successMessage = '';

  public allRating: any = [
    {
      value: 1,
      isSelected: false
    },
    {
      value: 2,
      isSelected: false
    },
    {
      value: 3,
      isSelected: false
    },
    {
      value: 4,
      isSelected: false
    },
    {
      value: 5,
      isSelected: false
    }
  ]

  public resType: string = ''

  constructor(private activatedRoute: ActivatedRoute, private __network: NetworkService, private router: Router) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.resType = res.type;
      switch (res.type) {
        case 'tmdb_movie':
          this.__network.getMovieDetails(res.id).subscribe(res => {
            this.itemDetails = res
          })

          break;

        case 'tmdb_tv':
          this.__network.getTvDetails(res.id).subscribe(res => {
            this.itemDetails = res
          })
          break;

        case 'rawg':
          this.__network.getGameDetails(res.id).subscribe(res => {
            this.itemDetails = res
          })
          break;
      }
    })
  }

  addRating(rating: number) {
    this.allRating = this.allRating.map((r: any) => {
      return {
        ...r,
        isSelected: false
      }
    })
    for (let i = 0; i < rating; i++) {
      this.allRating[i].isSelected = true;
    }
  }

  ngOnInit(): void {
    let user = this.__network.getUser();
    if (user) {
      this.isLoggedIn = true;
    }
  }

  showSuccess(message: string) {
    setTimeout(() => {
      this.successMessage = message
    }, 5000)
  }

  getImage(src: string) {
    return `${this.__network.endpoints.tmdbImage}original/${src}`
  }

  saveRating() {
    if (!this.isLoggedIn) {
      this.router.navigate(['auth'])
    } else {
      let data = {
        item_id: this.itemDetails.id,
        type: this.resType,
        rating: this.totalRating
      }

      this.__network.updateItemRating(data).subscribe((res: any) => {
        if (res.message === 'Rating recorded successfully.') {
          this.showSuccess(res.message);
        }
      })
    }
  }
}
