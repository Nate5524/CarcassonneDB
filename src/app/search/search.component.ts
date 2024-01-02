import { Component, inject } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../tile';
import { TileFinderService } from '../tile-finder.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TileComponent, CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  tileList : Tile[] = [];
  tileFinderService : TileFinderService = inject(TileFinderService);
  sidesSearch : string = '';

  constructor() {
    this.tileList = this.tileFinderService.fullTileList;
  }

  searchBySides() {
    this.sidesSearch = this.sidesSearch.toUpperCase();
    this.tileList = this.tileFinderService.findTilesBySides(this.sidesSearch);
  }
}
