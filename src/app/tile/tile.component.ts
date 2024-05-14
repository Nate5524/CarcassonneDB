import { Component , Input, OnInit} from '@angular/core';
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
export class TileComponent implements OnInit{
  versions :string[] = [];

  @Input() tile !: Tile;

  ngOnInit(){
    for (const [key, value] of Object.entries(this.tile.variations)) {
      if (value != undefined){
        this.versions.push(`${key}: ${value}`);
      }
    }
  }
}
