import { Component, inject } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../tile';
import { TileFinderService } from '../tile-finder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TileComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  tileList : Tile[] = [];
  tileFinderService : TileFinderService = inject(TileFinderService);

  constructor() {
    this.tileList = this.tileFinderService.fullTileList;
    
  }
}
