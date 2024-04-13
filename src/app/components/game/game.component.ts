import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CardRowComponent } from '../card-row/card-row.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CardRowComponent, CommonModule, RouterModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  constructor(private data: NetworkService,) { }

  public isModelAdded = true;
  public genreReccs: any = []
  public isObjectPopulated = false

  sortByWeight(g_1: any, g_2: any) {
    return g_2.weight - g_1.weight
  }

  ngOnInit(): void {
    this.data.getUserModel().subscribe((res: any) => {
      if (res.data) {
        let userSelectedGenres = res.data.genres
        let mGenres = userSelectedGenres.filter((g: any) => g.type === 'g')
        if (mGenres.length) {
          let asyncObj: any = {};
          mGenres.forEach((g: any) => {
            asyncObj[g.id] = this.data.getGamesWithGenreId(g.id)
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
        else {
          this.isModelAdded = false
        }
      } else {
        this.isModelAdded = false
      }
    })
  }
}
