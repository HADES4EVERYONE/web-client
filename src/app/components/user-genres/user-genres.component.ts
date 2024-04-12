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
  public successMessage: string = '';

  allGenres: any = {
    movieGenres: [],
    tvGenres: [],
    gameGenres: []
  }

  selectedGenres: any = {
    movieGenres: [],
    tvGenres: [],
    gameGenres: []
  }

  showWarning: string = '';

  constructor(private __network: NetworkService) { }

  showSuccessMessage(str: string) {
    this.successMessage = str

    setTimeout(() => {
      this.successMessage = ''
    }, 5000)
  }

  ngOnInit(): void {
    let user = this.__network.getUser();
    let userSelectedGenres: any = []

    if (user && user.model && user.model.genres) {
      userSelectedGenres = user.model.genres;
    }

    this.genreSubscription = this.__network.getAllGenres().subscribe((res: any) => {
      if (!userSelectedGenres.length) {
        this.allGenres.movieGenres = res[0].genres.map((g: any) => {
          return { ...g, isSelected: false, type: 'm', weight: 0 }
        });
        this.allGenres.tvGenres = res[1].genres.map((g: any) => { return { ...g, isSelected: false, type: 't', weight: 0 } });
        this.allGenres.gameGenres = res[2].results.map((g: any) => { return { ...g, isSelected: false, type: 'g', weight: 0 } })
      } else {
        let mGenres = userSelectedGenres.filter((mg: any) => mg.type === 'm')
        let tvGenres = userSelectedGenres.filter((tg: any) => tg.type === 't')
        let gGenres = userSelectedGenres.filter((gg: any) => gg.type === 'g')

        this.allGenres.movieGenres = res[0].genres.map((g: any) => {
          let isStored = false;
          let storedRes = {}
          mGenres.forEach((ug: any) => {
            if (g.id === ug.id) {
              isStored = true
              storedRes = { ...ug, isSelected: true }
            }
          })
          if (isStored) {
            return {
              ...storedRes
            }
          }
          return { ...g, isSelected: mGenres.includes(g.id), type: 'm', weight: 0 }
        });


        this.allGenres.tvGenres = res[1].genres.map((g: any) => {
          let isStored = false;
          let storedRes = {}
          tvGenres.forEach((ug: any) => {
            if (g.id === ug.id) {
              isStored = true
              storedRes = { ...ug }
            }
          })
          if (isStored) {
            return {
              ...storedRes,
              isSelected: true
            }
          }
          return { ...g, isSelected: tvGenres.includes(g.id), type: 't', weight: 0 }
        });
        this.allGenres.gameGenres = res[2].results.map((g: any) => {
          let isStored = false;
          let storedRes = {}
          gGenres.forEach((ug: any) => {
            if (g.id === ug.id) {
              isStored = true
              storedRes = { ...ug }
            }
          })
          if (isStored) {
            return {
              ...storedRes,
              isSelected: true
            }
          }
          return { ...g, isSelected: gGenres.includes(g.id), type: 'g', weight: 0 }
        })
      };
    })
  }

  showErrMessage(err: string) {
    this.showWarning = err

    setTimeout(() => {
      this.showWarning = ''
    }, 5000)
  }

  saveSelectedGenres() {
    let selectedGenres = [
      ...this.allGenres.movieGenres.filter((g: any) => g.isSelected).map((g: any) => { return { name: g.name, id: g.id, type: g.type, weight: g.weight } }),
      ...this.allGenres.tvGenres.filter((g: any) => g.isSelected).map((g: any) => { return { name: g.name, id: g.id, type: g.type, weight: g.weight } }),
      ...this.allGenres.gameGenres.filter((g: any) => g.isSelected).map((g: any) => { return { name: g.name, id: g.id, type: g.type, weight: g.weight } })
    ]
    let user = this.__network.getUser()
    user.model = {
      genres: selectedGenres
    };
    this.__network.storeUser(user)
    this.showSuccessMessage('Genres saved successfully')
  }

  selectGenre(item: any, type: string) {

    switch (type) {
      case 'movie':
        if (item.isSelected) {
          item.isSelected = false
          item.weight = 0;
          this.selectedGenres.movieGenres = this.allGenres.movieGenres.filter((g: any) => g.isSelected)
        }
        else {
          if (this.selectedGenres.movieGenres.length < 3) {
            item.isSelected = true
            this.selectedGenres.movieGenres = this.allGenres.movieGenres.filter((g: any) => g.isSelected)
            item.weight = 4 - this.selectedGenres.movieGenres.length
          } else {
            this.showErrMessage('Cannot select more than 3 per category!')
          }
        }

        break;

      case 'tv':
        if (item.isSelected) {
          item.isSelected = false
          item.weight = 0;
          this.selectedGenres.tvGenres = this.allGenres.tvGenres.filter((g: any) => g.isSelected)
        }
        else {
          if (this.selectedGenres.tvGenres.length < 3) {
            item.isSelected = true
            this.selectedGenres.tvGenres = this.allGenres.tvGenres.filter((g: any) => g.isSelected)
            item.weight = 4 - this.selectedGenres.tvGenres.length
          } else {
            this.showErrMessage('Cannot select more than 3 per category!')
          }
        }
        break;

      case 'game':
        if (item.isSelected) {
          item.isSelected = false
          item.weight = 0;
          this.selectedGenres.gameGenres = this.allGenres.gameGenres.filter((g: any) => g.isSelected)
        }
        else {
          if (this.selectedGenres.gameGenres.length < 3) {
            item.isSelected = true
            this.selectedGenres.gameGenres = this.allGenres.gameGenres.filter((g: any) => g.isSelected)
            item.weight = 4 - this.selectedGenres.gameGenres.length
          } else {
            this.showErrMessage('Cannot select more than 3 per category!')
          }
        }
        break;
    }
  }
}
