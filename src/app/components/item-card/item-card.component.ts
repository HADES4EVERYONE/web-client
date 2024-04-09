import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  providers: [NetworkService]
})
export class ItemCardComponent implements OnInit {

  constructor(private __network: NetworkService, private router: Router) { }

  @Input() item: any = {}
  @Input() options: any = {}

  public itemModal: any = {};

  ngOnInit(): void {
  }

  getImage(src: string) {
    return `${this.__network.endpoints.tmdbImage}w154/${src}`
  }

  onDetails(item: any) {
    console.log(item);
    this.router.navigate([`/item-details/${this.options.type}/${this.item.id}`])
  }
}
