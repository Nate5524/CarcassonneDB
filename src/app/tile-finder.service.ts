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
    this.tileList = this.tileList.concat(data.tradersAndBuildersC3Tiles());
  }

  findTilesBySides(search: string): Tile[] {
    let found: Tile[] = [];
    let UNKNOWN = '-';
    // If all given sides are unknown, default to returning all tiles
    if (search == UNKNOWN.repeat(search.length)) {
      return this.tileList;
    }
    for (let tile of this.tileList) {
      let permute = [
        tile.sides,
        tile.sides.slice(1) + tile.sides.slice(0, 1),
        tile.sides.slice(2) + tile.sides.slice(0, 2),
        tile.sides.slice(3) + tile.sides.slice(0, 3),
      ];
      for (let orientation of permute) {
        if (search[0] == UNKNOWN || search[0] == orientation[0]) {
          if (search.length == 1) {
            found.push(tile);
            break;
          } else if (search[1] == UNKNOWN || search[1] == orientation[1]) {
            if (search.length == 2) {
              found.push(tile);
              break;
            } else if (search[2] == UNKNOWN || search[2] == orientation[2]) {
              if (search.length == 3) {
                found.push(tile);
                break;
              } else if (search[3] == UNKNOWN || search[3] == orientation[3]) {
                found.push(tile);
                break;
              }
            }
          }
        }
      }
    }
    return found;
  }
}
