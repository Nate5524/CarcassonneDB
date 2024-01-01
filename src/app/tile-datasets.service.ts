import { Injectable } from '@angular/core';
import { Tile } from './tile';

@Injectable({
  providedIn: 'root',
})
export class TileDatasetsService {
  BaseC3: Tile[] = [
    {
      sides: 'FFRF',
      image: 'Base_Game_C3_Tile_A.png',
      stringRep: 'This is a tile',
      monastery: true,
      shield: false,
    },
    {
      sides: 'FFFF',
      image: 'Base_Game_C3_Tile_B.png',
      stringRep: 'This is a tile',
      monastery: true,
      shield: false,
    },
    {
      sides: 'CCCC',
      image: 'Base_Game_C3_Tile_C.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true,
    },
    {
      sides: 'CRFR',
      image: 'Base_Game_C3_Tile_D.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CFFF',
      image: 'Base_Game_C3_Tile_E.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'FCFC',
      image: 'Base_Game_C3_Tile_F.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true,
    },
    {
      sides: 'FCFC',
      image: 'Base_Game_C3_Tile_G.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CFCF',
      image: 'Base_Game_C3_Tile_H.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CFFC',
      image: 'Base_Game_C3_Tile_I.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CRRF',
      image: 'Base_Game_C3_Tile_J.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CFRR',
      image: 'Base_Game_C3_Tile_K.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CRRR',
      image: 'Base_Game_C3_Tile_L.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CCFF',
      image: 'Base_Game_C3_Tile_M.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true,
    },
    {
      sides: 'CCFF',
      image: 'Base_Game_C3_Tile_N.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CRRC',
      image: 'Base_Game_C3_Tile_O.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true,
    },
    {
      sides: 'CRRC',
      image: 'Base_Game_C3_Tile_P.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CCFC',
      image: 'Base_Game_C3_Tile_Q.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true,
    },
    {
      sides: 'CCFC',
      image: 'Base_Game_C3_Tile_R.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CCRC',
      image: 'Base_Game_C3_Tile_S.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true,
    },
    {
      sides: 'CCRC',
      image: 'Base_Game_C3_Tile_T.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'RFRF',
      image: 'Base_Game_C3_Tile_U.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'FFRR',
      image: 'Base_Game_C3_Tile_V.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'FRRR',
      image: 'Base_Game_C3_Tile_W.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'RRRR',
      image: 'Base_Game_C3_Tile_X.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    }
  ];

  InnsAndCathedralsC3: Tile[] = [
    {
      sides: 'FFRR',
      image: 'Inns_And_Cathedrals_C3_Tile_A.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
      inn: true
    },
    {
      sides: 'FRFR',
      image: 'Inns_And_Cathedrals_C3_Tile_B.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
      inn: true
    },
    {
      sides: 'FRRR',
      image: 'Inns_And_Cathedrals_C3_Tile_C.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
      inn: true
    },
    {
      sides: 'FRFR',
      image: 'Inns_And_Cathedrals_C3_Tile_D.png',
      stringRep: 'This is a tile',
      monastery: true,
      shield: false
    },
    {
      sides: 'RRRR',
      image: 'Inns_And_Cathedrals_C3_Tile_E.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
    },
    {
      sides: 'CRFC',
      image: 'Inns_And_Cathedrals_C3_Tile_F.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    },
    {
      sides: 'FFFC',
      image: 'Inns_And_Cathedrals_C3_Tile_G.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    },
    {
      sides: 'CCCC',
      image: 'Inns_And_Cathedrals_C3_Tile_H.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    },
    {
      sides: 'CRCR',
      image: 'Inns_And_Cathedrals_C3_Tile_I.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    },
    {
      sides: 'CFRF',
      image: 'Inns_And_Cathedrals_C3_Tile_J.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    },
    {
      sides: 'CCCC',
      image: 'Inns_And_Cathedrals_C3_Tile_Ka.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
      cathedral: true
    },
    {
      sides: 'CCCC',
      image: 'Inns_And_Cathedrals_C3_Tile_Kb.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
      cathedral: true
    },
    {
      sides: 'CRRC',
      image: 'Inns_And_Cathedrals_C3_Tile_L.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true,
      inn: true
    },
    {
      sides: 'CFRR',
      image: 'Inns_And_Cathedrals_C3_Tile_M.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
      inn: true
    },
    {
      sides: 'CFRC',
      image: 'Inns_And_Cathedrals_C3_Tile_N.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false,
      inn: true
    },
    {
      sides: 'CCFC',
      image: 'Inns_And_Cathedrals_C3_Tile_O.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    },
    {
      sides: 'CFCC',
      image: 'Inns_And_Cathedrals_C3_Tile_P.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true
    },
    {
      sides: 'RCRC',
      image: 'Inns_And_Cathedrals_C3_Tile_Q.png',
      stringRep: 'This is a tile',
      monastery: false,
      shield: true
    }
  ];

  RiverIC2: Tile[] = [
    {
      sides: 'FFSF',
      image: 'River_I_C2_Tile_A.jpg',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    },
    {
      sides: 'CSRS',
      image: 'River_I_C2_Tile_B.jpg',
      stringRep: 'This is a tile',
      monastery: false,
      shield: false
    }
  ]

  baseC3Tiles(): Tile[] {
    return this.BaseC3;
  }

  innsAndCathedralsC3Tiles(): Tile[] {
    return this.InnsAndCathedralsC3;
  }

  riverIC2Tiles(): Tile[] {
    return this.RiverIC2;
  }

  constructor() {}
}
