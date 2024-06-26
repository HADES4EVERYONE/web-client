import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';
import { CardRowComponent } from '../card-row/card-row.component';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, CardRowComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
  providers: []
})
export class ItemDetailsComponent implements OnInit {

  public itemDetails: any = {};

  public isLoggedIn = false;

  public isWishlisted = false;

  public similar: any = [];
  public isSimilarAvailable = false

  public totalRating = 0;

  public successMessage = '';

  public loadedSimilar = false;

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
  public resId: string = '';

  constructor(private activatedRoute: ActivatedRoute, private __network: NetworkService, private router: Router) {


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.itemDetails = {}
        this.totalRating = 0;
        this.isWishlisted = false
        this.ngOnInit();
        setTimeout(() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        })
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
    this.totalRating = 0;
    for (let i = 0; i < rating; i++) {
      this.allRating[i].isSelected = true;
      this.totalRating = this.allRating[i].value
    }
  }

  checkWishList(data: any) {
    this.__network.checkItemForWishlist(data).subscribe((res: any) => {
      if (res.message = "Check completed.") {
        this.isWishlisted = res.in_wishlist
      }
    })
  }

  ngOnInit(): void {
    let user = this.__network.getUser();
    if (user) {
      this.isLoggedIn = true;
    }

    this.activatedRoute.params.subscribe((res: any) => {
      this.resType = res.type;
      this.resId = res.id;
      if (this.isLoggedIn) {

      }
      switch (res.type) {
        case 'tmdb_movie':
          this.__network.getMovieDetails(res.id).subscribe(res => {
            this.itemDetails = res;
            if (this.isLoggedIn) {
              this.checkWishList({
                item_id: this.resId,
                type: this.__network.getItemType(this.resType),
                name: this.itemDetails.name || this.itemDetails.title
              })
            }
          })

          break;

        case 'tmdb_tv':
          this.__network.getTvDetails(res.id).subscribe(res => {
            this.itemDetails = res;
            if (this.isLoggedIn) {
              this.checkWishList({
                item_id: this.resId,
                type: this.__network.getItemType(this.resType),
                name: this.itemDetails.name || this.itemDetails.title
              })
            }
          })
          break;

        case 'rawg':
          this.__network.getGameDetails(res.id).subscribe(res => {
            this.itemDetails = res;
            if (this.isLoggedIn) {
              this.checkWishList({
                item_id: this.resId,
                type: this.__network.getItemType(this.resType),
                name: this.itemDetails.name || this.itemDetails.title
              })
            }
          })
          break;
      }
    })

    if (this.isLoggedIn) {
      this.__network.getRatings(this.__network.getItemType(this.resType)).subscribe((res: any) => {
        if (res.message === 'Ratings retrieved successfully.') {
          res.data.forEach((item: any) => {
            if (item.item_id == this.resId) {
              this.addRating(item.rating)
            }
          })
        }
      })
    }


    if (this.resType === 'tmdb_movie') {
      this.__network.getSimilarMovies(this.resId).subscribe((res: any) => {
        if (res.results.length) {
          this.similar = res.results
          this.isSimilarAvailable = true
          this.loadedSimilar = true;
        }
      })
    } else if (this.resType === 'tmdb_tv') {
      this.__network.getSimilarMovies(this.resId).subscribe((res: any) => {
        if (res.results.length) {
          this.similar = res.results
          this.isSimilarAvailable = true
          this.loadedSimilar = true;
        }
      })
    }

  }

  showSuccess(message: string) {
    this.successMessage = message
    setTimeout(() => {
      this.successMessage = '';
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
        type: this.__network.getItemType(this.resType),
        rating: this.totalRating
      }

      this.__network.updateItemRating(data).subscribe((res: any) => {
        if (res.message === 'Rating recorded successfully.') {
          this.showSuccess(res.message);
        }
      })
    }
  }

  addItemToWishlist() {
    if (!this.isLoggedIn) {
      this.router.navigate(['auth'])
    } else if (!this.isWishlisted) {
      this.__network.updateWishlist({
        item_id: this.itemDetails.id,
        type: this.__network.getItemType(this.resType),
        name: this.itemDetails.name || this.itemDetails.title
      }).subscribe((res: any) => {
        if (res.message == 'wishlist updated successfully.') {
          this.isWishlisted = true
        }
      })
    } else if (this.isWishlisted) {
      this.__network.removeFromWishlist(this.__network.getItemType(this.resType), this.resId).subscribe(res => {
        this.isWishlisted = false
      })
    }
  }
}
