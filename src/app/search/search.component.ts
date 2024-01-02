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
  searchMessage : string = '';

  constructor() {
    this.tileList = this.tileFinderService.fullTileList;
  }

  searchBySides() {
    if (this.sidesSearch.length === 0){
      this.tileList = this.tileFinderService.fullTileList;
      this.generateSearchMessage();
      return;
    }
    this.tileList = this.tileFinderService.findTilesBySides(this.sidesSearch.toUpperCase());
    this.generateSearchMessage();
  }

  generateSearchMessage(){
    this.searchMessage = this.tileList.length + " tiles found";
    if(this.sidesSearch.length > 0){
    this.searchMessage += "with sides \"" + this.sidesSearch.toUpperCase() + "\".";
    }
  }
}
