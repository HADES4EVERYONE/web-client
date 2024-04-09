import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CardRowComponent } from '../card-row/card-row.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CardRowComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  constructor(private data: NetworkService) { }

  public isModelAdded = false;
  public genreRecc: any = []
  ngOnInit(): void {
    let user = this.data.getUser()
    let userSelectedGenres = []
    let mGenres = []
    console.log(this.data.getUser());
    if (user && user.model && user.model.genres) {
      userSelectedGenres = user.model.genres
      mGenres = userSelectedGenres.filter((g: any) => g.type === 'm').map((g: any) => g.id)
      if (mGenres.length) {
        // get movie genres
        console.log(mGenres)
        this.data.getMoviesWithGenreId(mGenres.join(',')).subscribe((res: any) => {
          console.log(res);
          this.genreRecc = res.results
        })
      }
    } else {
      this.isModelAdded = false
    }
  }
}
