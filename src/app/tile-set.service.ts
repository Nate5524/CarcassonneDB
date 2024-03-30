import { Injectable } from '@angular/core';
import { Tile } from './tile';
import { TileDatasetsService } from './tile-datasets.service';

@Injectable({
  providedIn: 'root',
})

//TODO: probably deprecated, delete when other solution works

/**
 * Encapsulation of logic for a group of tiles (does not take expansion into account -
 * intended use is to only add tiles from the same expansion, but this class will NOT
 * verify that that is the case before adding something. This will likely result in
 * unexpected/incorrect behavior if ignored). Meant for small collections of data
 * (under 50 elements), as everything is optimized for linear searching.
 * //FIXME: - should expansion be an attribute?
 */
export class TileList {
  private data: Tile[];

  constructor() {
    this.data = [];
  }

  /**
   * Check if a tile identical from the same expansion with the same expansionID as the one passed as a parameter exists in this list.
   * @param t - the tile to check for
   * @returns true if the tile was found in the list
   */
  contains(t: Tile): boolean {
    return this.indexOf(t) >= 0;
  }

  /**
   * Find the index of a given tile in the list. Does not have to be the same object, just equivalent tiles
   * (ie. matching expansion and expansionID data). Uses a linear search algorithm, as expected size of data list is small.
   * @param t - the tile to search for
   * @returns the index of the tile, or -1 if it couldn't be found in the set
   */
  indexOf(t: Tile): number {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].expId === t.expId) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Add a given tile to the list. The tile will be added in its sorted location.
   * @param t - the tile to add
   */
  add(t: Tile) {
    this.data.push(t);
  }

  /**
   * Remove the first instance of a given tile in the list. Does not have to be the same object, just equivalent tiles
   * (ie. matching expansion and expansionID data).
   * @param t - the tile to remove
   * @returns true if the tile was removed, false if it wasn't found in the list
   */
  remove(t: Tile): boolean {
    let i = this.indexOf(t);
    if (i >= 0) {
      this.data.splice(i, 1);
      return true;
    }
    return false;
  }

  /**
   * Get the size of this object.
   * @returns the number of stored tiles
   */
  size():number{
    return this.data.length;
  }

  /**
   * Get the tile at a given index in the list. If the index is out of bounds, return null.
   * @param index - the index of the tile to get
   */
  get(index:number):Tile|null{
    if (index < 0 || index >= this.data.length){
      return null;
    }
    return this.data[index];
  }
}

/**
 * Encapsulation of logic for a set of tiles from multiple different game expansions.
 */
export class TileSet implements Iterable<Tile> {
  private data: { [key: string]: TileList } = {};

  constructor() {
    this.reset();
  }

  /***************************
   * Add methods
   ***************************/

  /**
   * Add a single tile to the tileSet.
   * @param t - the tile to add to the set
   * @param addDupes - false if tiles that already exist in the set should not be added, true otherwise
   * @param expansion - if known, the expansion codeName should be passed as an argument here to accelerate lookups
   */
  addTile(t: Tile, addDupes: boolean, expansion: string) {
    // If expansion not given, one either must be found or created in data
    if (expansion == undefined){
      if (!(t.expansion in this.data)){
        this.data[t.expansion] = new TileList();
        console.log("New TileList had to be created - is your tile coming from the right place?");
      }
      expansion = t.expansion;
    }

    if(addDupes || !this.contains(t)){
      this.data[expansion].add(t);
    }
  }

  /**
   * Add every tile in a given expansion to the set.
   * @param e - the name of the expansion to add. Spelling/case must match its name exactly
   * @param addDupes - false if tiles that already exist in the set should not be added, true otherwise
   */
  addExpansion(e: string, addDupes: boolean) {
    for (let i = 0; i < TileDatasetsService.expansions.length; i++) {
      if (TileDatasetsService.expansions[i].codeName === e) {
        let tileList = TileDatasetsService.expansions[i].tiles;
        for (let j = 0; j < tileList.length; j++) {
          this.addTile(tileList[j], addDupes, e);
        }
      }
    }
  }

  /**
   * Add every tile in a given TileSet instance to this one.
   * @param s - the set to add to this
   * @param addDupes - false if tiles that already exist in the set should not be added, true otherwise
   */
  addTileSet(s: TileSet, addDupes: boolean) {
    for(let tile of s){
      if(addDupes || !this.contains(tile)){
        this.data[tile.expansion].add(tile);
      }
    }
  }

  /***************************
   * Remove methods
   ***************************/
  //FIXME: - should these return a bool?

  /**
   * Remove an instance of a tile from the tile set.
   * @param t - a copy (not necessarily the same instance) of the tile to remove
   * @param removeAll - if multiple copies of the tile exist in the set, should all be removed? - defaults to false
   */
  removeTile(t: Tile, removeAll: boolean = false) {
    //TODO: - implement removeAll
    this.data[t.expansion].remove(t);
  }

  /**
   * Remove all copies of every tile in a given game expansion.
   * @param s - the name of the expansion to remove. Spelling/case must match its name exactly
   */
  removeExpansion(s: string) {
    this.data[s] = new TileList();
  }

  /**
   * Remove every tile in a given TileSet instance from this one.
   * @param s - the set to remove from this
   */
  removeTileSet(s: TileSet) {
    for(let t of s){
      this.data[t.expansion].remove(t);
    }
  }

  /***************************
   * Logical set operations
   ***************************/

  /**
   * Add another set to this one. Duplicate tiles will not be added a second time.
   * Equivalent to the mathematical "union" set operation.
   * @param s - the set to add
   */
  union(s: TileSet) {
    this.addTileSet(s, false);
  }

  /**
   * Remove all tiles that are in this set but are not in the other.
   * Equivalent to the mathematical "intersect" set operation.
   * @param s - the other set
   */
  intersect(s: TileSet) {
    for(let tile of this){
      if(!s.contains(tile)){
        this.removeTile(tile);
      }
    }
  }

  /**
   * Remove all elements from this set, and add only those that are in the other but not this.
   * Equivalent to the mathematical "complement" set operation.
   * @param s - the other set
   */
  complement(s: TileSet) {
    let newSetData: { [key: string]: TileList } = {}; // Add index signature
    for (let i = 0; i < TileDatasetsService.expansions.length; i++) {
      this.data[TileDatasetsService.expansions[i].codeName] = new TileList();
    }
    for(let tile of s){
      if(!this.contains(tile)){
        newSetData[tile.expansion].add(tile);
      }
    }
  }

  /***************************
   * Utility methods
   ***************************/

  /**
   * Perform a search operation on this set. Search ops are defined as
   * any valid operations that the user can enter into the search bar.
   * Each should exist in the lookup table as its own function.
   * @param op - the operation to perform. If there are arguments, separate
   * them from the operation name using a colon
   */
  performSearchOp(op: string) {
    //TODO: - method to perform search op on set
  }

  //TODO: - TEST THIS: TOP PRIORITY
  [Symbol.iterator]() : Iterator<Tile>{
    let expInd = 0, listInd = 0;
    const data = this.data;
    const keys = Object.keys(data);

    return {
      next: function(): IteratorResult<Tile>{
        if (expInd >= keys.length){
          return {value:null, done: true}
        } else if (listInd >= data[keys[expInd]].size()){
          expInd++;
          listInd = 0;
          if (expInd < keys.length && data[keys[expInd]].size() > 0){
            //@ts-ignore
            return {value: data[keys[expInd]].get(listInd), done:false}
          } else {
            return {value:null, done:true}
          }
        } else {
          //@ts-ignore
          return {value: data[keys[expInd]].get(listInd), done:false}
        }
      }
    };
  }

  contains(t:Tile):boolean{
    return this.data[t.expansion].indexOf(t)>=0;
  }

  /**
   * Reset the TileSet to its empty state.
   */
  reset() {
    this.data = {};
    for (let i = 0; i < TileDatasetsService.expansions.length; i++) {
      this.data[TileDatasetsService.expansions[i].codeName] = new TileList();
    }
  }
}
