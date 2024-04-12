import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private __network: NetworkService) {
    this.activatedRoute.params.subscribe((res: any) => {
      switch (res.type) {
        case 'tmdb_movie':
          this.__network.getMovieDetails(res.id).subscribe(res => {
            console.log(res);
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

  }

  getImage(src: string) {
    return `${this.__network.endpoints.tmdbImage}original/${src}`
  }
}
