import { Component } from '@angular/core';
import { Item } from './item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Item[] = [
    { name: 'Nombre 1', cost: '10' },
    { name: 'Nombre 2', cost: '20' },
    { name: 'Nombre 3', cost: '30' }
  ];
}

