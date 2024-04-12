import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CardRowComponent } from '../card-row/card-row.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CardRowComponent, CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  constructor(private data: NetworkService) { }

  public isModelAdded = false;
  public genreReccs: any = []
  public isObjectPopulated = false

  sortByWeight(g_1: any, g_2: any) {
    return g_2.weight - g_1.weight
  }

  ngOnInit(): void {
    let user = this.data.getUser()
    let userSelectedGenres = []
    let mGenres: any = []
    if (user && user.model && user.model.genres) {
      userSelectedGenres = user.model.genres
      mGenres = userSelectedGenres.filter((g: any) => g.type === 'm')
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
        })
      }
    } else {
      this.isModelAdded = false
    }
  }
}
