import { Component, OnInit } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [NetworkService]
})
export class HeaderComponent implements OnInit {

  constructor(private __network: NetworkService) { }

  ngOnInit(): void {
    // this.__network.getTmdbConfig().subscribe(res => console.log(res));
  }
}
