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

        this.data.getAllMovies(asyncObj).subscribe((res: any) => {
          Object.keys(res).forEach(r => {
            let genre_name = '';
            mGenres.forEach((g: any) => {
              console.log(g)
              if (g.id == r) {
                genre_name = g.name
              }
            })
            console.log(genre_name);
            this.genreReccs.push({ genre: genre_name, results: res[r].results })
          })
        })
      }
    } else {
      this.isModelAdded = false
    }
  }
}
