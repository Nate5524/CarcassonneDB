import {Tile} from "./tile"
export interface ExpansionPack {
    codeName:string,
    realName:string,
    printing:string,
    tiles: Tile[],
}
