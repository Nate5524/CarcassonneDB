import { Injectable } from '@angular/core';
import { Tile } from './tile';
import { TileDatasetsService } from './tile-datasets.service';

@Injectable({
  providedIn: 'root'
})
export class TileFinderService {
  tileList : Tile[] = [];


get fullTileList() : Tile[]{
  return this.tileList;
}

  constructor() { 
    let data : TileDatasetsService = new TileDatasetsService();
    // Update for dynamic generation
    this.tileList = data.riverIC2Tiles();
    this.tileList = this.tileList.concat(data.baseC3Tiles());
    this.tileList = this.tileList.concat(data.innsAndCathedralsC3Tiles());
  }
}
