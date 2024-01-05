export interface Tile {
    // id: number;
    sides: string;
    image: string;
    stringRep: string;

    monastery: boolean;
    shield: boolean; // "Coat of Arms" in official rules
    starter?: boolean; // "Start Tile" - not part of the deck, but options vary based on expansions

    //Potential tile features (mostly decorative, minor game effects)
    // garden: boolean;
    // farmhouse: boolean;
    // cowshed: boolean;
    // waterTower: boolean;
    // highwayman: boolean;
    // pigsty: boolean;
    // donkeyStable: boolean;

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
