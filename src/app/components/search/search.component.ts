import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [NetworkService]
})
export class SearchComponent {

  public searchTerm = '';
  public searchedTerm = '';

  constructor(private network: NetworkService) { }

  getResults() {
    this.network.getParallelSearch(this.searchTerm).subscribe(res => {
      this.searchedTerm = this.searchTerm;
      this.searchTerm = '';
      console.log(res);
    })

  }
}
