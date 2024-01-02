import { Injectable } from '@angular/core';
import { Tile } from './tile';
import { TileDatasetsService } from './tile-datasets.service';

@Injectable({
  providedIn: 'root',
})
export class TileFinderService {
  tileList: Tile[] = [];

  get fullTileList(): Tile[] {
    return this.tileList;
  }

  constructor() {
    let data: TileDatasetsService = new TileDatasetsService();
    // Update for dynamic generation - currently just manually adds tilesets
    this.tileList = data.riverIC2Tiles();
    this.tileList = this.tileList.concat(data.baseC3Tiles());
    this.tileList = this.tileList.concat(data.innsAndCathedralsC3Tiles());
  }

  findTilesBySides(search: string): Tile[]{
    let found: Tile[] = [];
    for (let tile of this.tileList) {
      let permute = [tile.sides, tile.sides.slice(1) + tile.sides.slice(0, 1), tile.sides.slice(2) + tile.sides.slice(0, 2), tile.sides.slice(3) + tile.sides.slice(0, 3)]
      if (permute.includes(search)) {
        found.push(tile);
      }
    }
    return found;
  }
}
