import { Component, Input } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-row',
  standalone: true,
  imports: [ItemCardComponent, CommonModule],
  templateUrl: './card-row.component.html',
  styleUrl: './card-row.component.scss'
})
export class CardRowComponent {
  @Input() options: any = {};
  @Input() items: any = [];
}
