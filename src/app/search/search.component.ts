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
  styleUrl: './search.component.css',
})
export class SearchComponent {
  tileList: Tile[] = [];
  tileFinderService: TileFinderService = inject(TileFinderService);
  searchMessage: string = '';

  // Search parameters
  stringSearch: string = '';
  sidesSearch: string = '';
  monasterySearch: boolean = false;
  shieldSearch: boolean = false;
  // Inns and Cathedrals
  innSearch: boolean = false;
  cathedralSearch: boolean = false;
  // Traders and Builders
  wheatSearch: boolean = false;
  clothSearch: boolean = false;
  wineSearch: boolean = false;

  constructor() {
    this.tileList = this.generateListFromExpansions();
  }

  generateListFromExpansions(): Tile[] {
    //TODO:
    return this.tileFinderService.fullTileList;
  }

  searchByStringParams() {
    let includedTiles: Tile[] = this.generateListFromExpansions();
    if (this.stringSearch.length === 0) {
      this.tileList = includedTiles;
      return;
    }
    this.searchShunted(this.shuntingYard(this.tokenizeSearchString()));
  }
  tokenizeSearchString(): string[] {
    // Tokenize
    let tokens = this.stringSearch
      .toLowerCase()
      .trim()
      .split(
        /(\s*\(\s*|\s*\)\s*|\s+and\s+|\s+or\s+|\s*not\s+|\s*&\s*|\s*\|\s*|\s*!\s*|\s+)/
      );
    // console.log("Split:");
    // console.log(tokens);
    for (let i = 0; i < tokens.length; i++) {
      tokens[i] = tokens[i].trim();
    }
    tokens = tokens.filter((t) => t.length > 0);

    // console.log("Filtered split:");
    // console.log(tokens);

    // Add implied 'and' operators
    let binOps = ['and', 'or', '&', '|'];
    let allOps = ['and', 'or', '&', '|', 'not', '!'];
    let temp = [];
    let lastWasOperator = true;
    for (let i = 0; i < tokens.length; i++) {
      if (!lastWasOperator && !binOps.includes(tokens[i])) {
        temp.push('&');
      }
      temp.push(tokens[i]);
      if (allOps.includes(tokens[i])) {
        lastWasOperator = true;
      } else {
        lastWasOperator = false;
      }
    }
    // console.log('Tokens:');
    // console.log(temp);
    return temp;
  }

  shuntingYard(tokens: string[]): string[] {
    // Parse tokens using shunting yard algorithm

    // Define operators and their precedence
    let precedence: { [key: string]: number } = {
      '(': -1,
      ')': -1,
      '|': 1,
      or: 1,
      '&': 2,
      and: 2,
      '!': 3,
      not: 3,
    };
    let output: string[] = []; //output queue
    let operators: string[] = []; //operator stack

    for (let t of tokens) {
      if (t === '(') {
        // mark the beginning of a set of parentheses
        operators.push(t);
      } else if (t === ')') {
        if (operators.length === 0) {
          //TODO: error handling
          console.log('Mismatched parentheses');
          return [];
        }
        while (operators[operators.length - 1] !== '(') {
          if (operators.length === 0) {
            //TODO: error handling
            console.log('Mismatched parentheses');
            return [];
          }
          // add contents of parentheses to output
          output.push(operators.pop() as string);
        }
        //remove the '(' to prevent errors later
        operators.pop();
      } else if (t in precedence) {
        // t is an operator - add operators with higher precedence to the output
        while (
          operators.length > 0 &&
          precedence[operators[operators.length - 1]] >= precedence[t]
        ) {
          output.push(operators.pop() as string);
        }
        operators.push(t);
      } else {
        // t is an operand
        output.push(t);
      }
    }
    while (operators.length > 0) {
      let o = operators.pop();
      if (o === '(' || o === ')') {
        //TODO: error handling
        console.log('Mismatched parentheses');
        return [];
      }
      output.push(o as string);
    }
    // console.log("After shunting:");
    // console.log(output);
    return output;
  }

  searchShunted(tokens: string[]) {
    //TODO: if not enough operands, return error
    //TODO: must do function evals into sets before the boolean set operations <- bad approach, do the set operations as you go (eg keep searching same set for &, flip it for !, add two existing sets for |)
    let operands = []; //stack of operands
    for (let i = 0; i < tokens.length; i++) {
      switch (tokens[i]) {
        case 'and':
        case '&':
          if (operands.length < 2) {
            //TODO: error
          }
          //TODO: and logic
          break;
        default:
          operands.push(tokens[i]);
      }
    }
  }
  // const funcDict = {
  //   s: this.searchBySides,
  //   sides: this.searchBySides,
  //   side: this.searchBySides,

  //   m: this.searchBooleanTrait,
  //   monastery: this.searchBooleanTrait,
  //   monasteries: this.searchBooleanTrait,

  //   i: this.searchBooleanTrait,
  //   inn: this.searchBooleanTrait,
  //   inns: this.searchBooleanTrait,

  //   c: this.searchBooleanTrait,
  //   cathedral: this.searchBooleanTrait,
  //   cathedrals: this.searchBooleanTrait,

  //   r: this.searchResource,
  //   resource: this.searchResource,
  //   resources: this.searchResource,
  // };

  searchResource(wheat: boolean, cloth: boolean, wine: boolean) {
    //TODO:
  }

  searchBySides() {
    if (this.sidesSearch.length === 0) {
      this.tileList = this.generateListFromExpansions();
      return;
    }
    this.tileList = this.tileFinderService.findTilesBySides(
      this.sidesSearch.toUpperCase()
    );
  }

  searchBooleanTrait(attribute: keyof Tile) {
    let tempList: Tile[] = [];
    for (let tile of this.tileList) {
      if (tile[attribute]) {
        tempList.push(tile);
      }
    }
    this.tileList = tempList;
  }

  applySearch() {
    this.searchMessage = '';
    this.searchBySides();
    if (this.sidesSearch.length > 0) {
      this.searchMessage += ' with sides "' + this.sidesSearch + '"';
    }
    const boolSearchTraits: any[] = [
      { attribute: 'monastery', search: this.monasterySearch },
      { attribute: 'shield', search: this.shieldSearch },
      { attribute: 'inn', search: this.innSearch },
      { attribute: 'cathedral', search: this.cathedralSearch },
      { attribute: 'wheat', search: this.wheatSearch },
      { attribute: 'cloth', search: this.clothSearch },
      { attribute: 'wine', search: this.wineSearch },
    ];

    for (let trait of boolSearchTraits) {
      if (trait.search) {
        this.searchBooleanTrait(trait.attribute);
        this.searchMessage += ' with ' + trait.attribute;
      }
    }
    this.searchMessage =
      this.tileList.length + ' tiles found' + this.searchMessage;
    return;
  }

  clearSearch() {
    //TODO:
  }
}
