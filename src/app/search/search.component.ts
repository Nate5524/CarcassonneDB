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

  searchForMonastery(){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile.monastery){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  searchForShield(){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile.shield){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  searchForInn(){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile.inn){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  searchForCathedral(){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile.cathedral){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  searchForWheat(){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile.wheat){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  searchForCloth(){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile.cloth){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  searchForWine(){
    let tempList : Tile[] = [];
    for(let tile of this.tileList){
      if(tile.wine){
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  applySearch(){
    this.searchBySides();
    if(this.monasterySearch){
      this.searchForMonastery();
    }
    if(this.shieldSearch){
      this.searchForShield();
    }
    if(this.innSearch){
      this.searchForInn();
    }
    if(this.cathedralSearch){
      this.searchForCathedral();
    }
    if(this.wheatSearch){
      this.searchForWheat();
    }
    if(this.clothSearch){
      this.searchForCloth();
    }
    if(this.wineSearch){
      this.searchForWine();
    }
    this.generateSearchMessage();
  }

  generateSearchMessage(){
    this.searchMessage = this.tileList.length + " tiles found";
    if(this.sidesSearch.length > 0){
    this.searchMessage += " with sides \"" + this.sidesSearch + "\"";
    }
    if(this.monasterySearch){
      this.searchMessage += " with monasteries";
    }
    if(this.shieldSearch){
      this.searchMessage += " with shields";
    }
    if(this.innSearch){
      this.searchMessage += " with inns";
    }
    if(this.cathedralSearch){
      this.searchMessage += " with cathedrals";
    }
    if(this.wheatSearch){
      this.searchMessage += " with wheat";
    }
    if (this.clothSearch){
      this.searchMessage += " with cloth";
    }
    if (this.wineSearch){
      this.searchMessage += " with wine";
    }
  }

  clearSearch(){
    //TODO:
  }
}
