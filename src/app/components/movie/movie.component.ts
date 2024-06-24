import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CardRowComponent } from '../card-row/card-row.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CardRowComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  constructor(private data: NetworkService) { }

  public isModelAdded = true;
  public genreReccs: any = []
  public isObjectPopulated = false;

  public calcReccs: any = [];

  sortByWeight(g_1: any, g_2: any) {
    return g_2.weight - g_1.weight
  }

  public isItemListLoaded = {
    calcReccs: false,
    genreReccs: false
  }

  ngOnInit(): void {
    this.data.getUserModel().subscribe((res: any) => {
      if (res.data) {
        let userSelectedGenres = res.data.genres
        let mGenres = userSelectedGenres.filter((g: any) => g.type === 'm')
        if (mGenres.length) {
          // get movie genres
          let asyncObj: any = {};
          mGenres.forEach((g: any) => {
            asyncObj[g.id] = this.data.getMoviesWithGenreId(g.id)
          })

          this.data.getParallelData(asyncObj).subscribe((res: any) => {
            Object.keys(res).forEach(r => {
              let genre_name = '';
              let weight = 0;
              mGenres.forEach((g: any) => {
                if (g.id == r) {
                  genre_name = g.name
                  weight = g.weight
                }
              })
              this.genreReccs.push({ genre: genre_name, results: res[r].results, weight })
            })
            this.genreReccs.sort(this.sortByWeight)
            this.isItemListLoaded.genreReccs = true;
          })
        }
      } else {
        this.isModelAdded = false
      }
    })

    this.data.getreccs('m').subscribe((res: any) => {
      let reqObj: any = {}
      let weightMap: any = {};
      if (res.data) {
        res.data.forEach((d: any) => {
          reqObj[d[0]] = this.data.getMovieDetails(d[0])
          weightMap[d[0]] = d[1];
        })

        this.data.getParallelData(reqObj).subscribe((res: any) => {
          Object.keys(res).forEach(d => {
            this.calcReccs.push({ ...res[d], weight: weightMap[d] })
          })

          this.calcReccs.sort(this.sortByWeight)
          this.isItemListLoaded.calcReccs = true;
        })
      }
    })
  }
}
