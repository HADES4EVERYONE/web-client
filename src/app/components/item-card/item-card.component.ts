import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  providers: [NetworkService]
})
export class ItemCardComponent implements OnInit {

  constructor(private __network: NetworkService) { }

  @Input() item: any = {}
  @Input() options: any = {}

  ngOnInit(): void {
    console.log(this.item);
  }

  getImage(src: string) {
    return `${this.__network.endpoints.tmdbImage}w185/${src}`
  }
}
