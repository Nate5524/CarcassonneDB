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
  searchMessage : string = '';

  // Search parameters
  sidesSearch : string = '';
  monasterySearch : boolean = false;
  shieldSearch : boolean = false;
  // Inns and Cathedrals
  innSearch : boolean = false;
  cathedralSearch : boolean = false;
  // Traders and Builders
  wheatSearch : boolean = false;
  clothSearch : boolean = false;
  wineSearch : boolean = false;

  constructor() {
    this.generateListFromExpansions();
  }

  generateListFromExpansions(){
    //TODO:
    this.tileList = this.tileFinderService.fullTileList;
  }

  searchBySides() {
    if (this.sidesSearch.length === 0){
      this.generateListFromExpansions();
      return;
    }
    this.tileList = this.tileFinderService.findTilesBySides(this.sidesSearch.toUpperCase());
  }

  searchBooleanTrait(attribute: keyof Tile){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile[attribute]){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  applySearch(){
    this.searchMessage = "";
    this.searchBySides();
    if(this.sidesSearch.length > 0){
      this.searchMessage += " with sides \"" + this.sidesSearch + "\"";
    }
    const boolSearchTraits: any[] = [
      {attribute: "monastery", search: this.monasterySearch},
      {attribute: "shield", search: this.shieldSearch},
      {attribute: "inn", search: this.innSearch},
      {attribute: "cathedral", search: this.cathedralSearch},
      {attribute: "wheat", search: this.wheatSearch},
      {attribute: "cloth", search: this.clothSearch},
      {attribute: "wine", search: this.wineSearch}
    ];

    for (let trait of boolSearchTraits){
      if (trait.search){
        this.searchBooleanTrait(trait.attribute);
      }
    }
    this.searchMessage = this.tileList.length + " tiles found" + this.searchMessage;
    return;
  }

  clearSearch(){
    //TODO:
  }
}
