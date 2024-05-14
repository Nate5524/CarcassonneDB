export interface Tile {
    // Identifiers
    expansion: string;
    expId: number; //Expansion ID - count up from 0 as tiles are added to a set. 
    //This is a metric I invented to make coding easier, not an inherent part of the game
    variations: TileVariations;

    sides: string;
    image: string;
    stringRep: string;

    monastery?: boolean;
    shield?: boolean; // "Coat of Arms" in official rules
    // starter?: boolean; // "Start Tile" - not part of the deck, but options vary based on expansions

    // Expansion 1:
    inn?: boolean;
    cathedral?: boolean;

    // Expansion 2:
    wheat?: boolean;
    wine?: boolean;
    cloth?: boolean;

    // Only matter if a game is being tracked
    // numInGame: number;
    // numInBag: number;
}

export interface TileVariations{
    g?: number; //garden
    f?: number; //farmhouse
    c?: number; //cowshed
    w?: number; //water tower
    h?: number; //highwayman
    p?: number; //pigsty
    d?: number; //donkey stable
    b?: number; //blank (no decorations)
}