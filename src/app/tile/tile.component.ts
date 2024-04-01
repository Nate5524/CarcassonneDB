import { Component , Input} from '@angular/core';
import { Tile } from '../tile';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent{
  @Input() tile !: Tile;
}
