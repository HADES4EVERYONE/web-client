import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NetworkService } from '../../services/network.service';
import { CardRowComponent } from '../card-row/card-row.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CardRowComponent, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [NetworkService]
})
export class SearchComponent {

  public searchTerm = '';
  public searchedTerm = '';

  public results: any = {
    movie: [],
    tv: [],
    game: []
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code == 'Enter' && this.searchTerm.length) {
      this.getResults();
    }
  }

  constructor(private network: NetworkService) { }

  getResults() {
    this.network.getParallelSearch(this.searchTerm).subscribe((res: any) => {
      this.searchedTerm = this.searchTerm;
      this.searchTerm = '';

      this.results.movie = res[0].results;
      this.results.tv = res[1].results;
      this.results.game = res[2].results;
    })
  }
}
