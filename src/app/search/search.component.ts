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

  /**
   * Generate a new list of tiles from the expansions selected by the user.
   * @returns 
   */
  generateListFromExpansions(): Tile[] {
    //TODO: actually generate list from expansions
    return [...this.tileFinderService.fullTileList];
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

    // Add implied 'and' operators. 
    // add "&" before current token if:
    // - not first token
    // - the previous token was not a binary operator or "(", and the current token is not a binary operator or ")"
    let binOps = ['and', 'or', '&', '|', ")"];
    let allOps = ['and', 'or', '&', '|', 'not', '!', "("];
    let temp = [];
    let lastWasOperator = true;
    for (let i = 0; i < tokens.length; i++) {
      if (!lastWasOperator && !binOps.includes(tokens[i])){
          temp.push('&');
      }
      temp.push(tokens[i]);
      lastWasOperator = allOps.includes(tokens[i]);
    }

    console.log('Tokens:');
    console.log(temp);
    return temp;
  }

  shuntingYard(tokens: string[]): string[] {
    // Parse tokens using shunting yard algorithm

    // Define operators and their precedence
    let precedence: { [key: string]: number } = {
      '(': -1,
      ')': -1,
      '|': 1,
      "or": 1,
      '&': 2,
      "and": 2,
      '!': 3,
      "not": 3,
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
    // console.log(tokens)
    let operands : (Tile[]|string)[] = []; //stack of operands
    for (let i = 0; i < tokens.length; i++) {
      switch (tokens[i]) {
        case 'and':
        case '&':
          if (operands.length < 2) {
            //TODO: error
          }
          var a = operands.pop();
          var b = operands.pop();
          if (typeof a === 'undefined'|| typeof b === 'undefined'){
            //TODO: error
            break;
          }
          operands.push(this.performAnd(a,b));
          break;

        case 'or':
        case '|':
          if (operands.length < 2) {
            //TODO: error
          }
          var a = operands.pop();
          var b = operands.pop();
          if (typeof a === 'undefined' || typeof b === 'undefined'){
            //TODO: error
            break;
          }
          operands.push(this.performOr(a,b));
          break;

        case 'not':
        case '!':
          if (operands.length < 1) {
            //TODO: error
          }
          var a = operands.pop();
          if (typeof a === 'undefined'){
            //TODO: error
            break;
          }
          operands.push(this.performNot(a));
          break;

        default:
          //TODO: error - search not supported
          operands.push(tokens[i]);
          break;
      }
    }
    if (operands.length > 1){
      //TODO: error
    }
    if (typeof operands[0] === 'string'){
      this.tileList = this.performQuerySearch(this.generateListFromExpansions(), operands[0]);
    } else {
      this.tileList = operands[0];
    }
  }

  /*****************************************************************************
   * Tile search operations:
   ****************************************************************************/

  // if exactly one is a string, search the other for the given query
  // if both are strings, de-string one and search it given other
  // if neither is a string, check shared elements
  performAnd(a:Tile[]|string, b:Tile[]|string):Tile[]{
    // if either is a string, set it up so a is a Tile[] and b is a string
    if (typeof a === "string" && typeof b === "string"){
      a = this.performQuerySearch(this.generateListFromExpansions(), a);
    }
    else if (typeof a === "string"){
      let temp = a;
      a = b;
      b = temp;
    }
    else if (typeof b != "string"){
      // both are lists, do an intersect here
      let ans:Tile[] = [];
      for (let tile of a){
        if (b.includes(tile)){
          ans.push(tile);
        }
      }
      return ans;
    }
    // a is a Tile[], b is a string (for some reason typescript can't see that). Search b in a.
    // @ts-ignore
    return this.performQuerySearch(a,b);
  }

  // if either or both are strings, query both into lists, then next step
  // then, in all cases, perform a union
  performOr(a:Tile[]|string, b:Tile[]|string):Tile[]{
    // if either is a string, query it and get the Tile[] result
    if (typeof a === "string"){
      a = this.performQuerySearch(this.generateListFromExpansions(), a);
    }
    if (typeof b === "string"){
      b = this.performQuerySearch(this.generateListFromExpansions(), b);
    }
    // perform a union
    for(let tile of b){
      if (!a.includes(tile)){
        a.push(tile);
      }
    }
    return a;
  }

  performNot(a:Tile[]|string):Tile[]{
    if (typeof a === "string"){
      a = this.performQuerySearch(this.generateListFromExpansions(), a);
    }
    let ans = this.generateListFromExpansions();
    for (let i = a.length - 1; i >= 0; i--){
      if (ans.includes(a[i])){
        ans.splice(ans.indexOf(a[i]),1);
      }
    }
    return ans;
  }

  performQuerySearch(tiles: Tile[], query:string):Tile[]{
    let q = query.toLowerCase().split(":");
    let q1:number;
    switch (q[0]){
      case "sides":
      case "side":
      case "s":
        if (q.length == 2){
        return this.performSidesSearch(tiles, q[1]);
        }
        break;

      case "monasteries":
      case "monastery":
      case "mon":
      case "m":
        if (q.length == 1){
          return this.performMonasterySearch(tiles, true);
        }
        else if (q.length == 2 && (q1 = this.parseBool(q[1])) != -1){
          return this.performMonasterySearch(tiles, q1===1);
        } 
        break;
      
      case "shields":
      case "shield":
      case "coat":
      case "coat of arms":
      case "coa":
      case "coatofarms":
      case "coat-of-arms":
      case "coat_of_arms":
      case "arms":
      case "coats":
        if (q.length == 1){
          return this.performShieldSearch(tiles, true);
        }
        else if (q.length == 2 && (q1 = this.parseBool(q[1])) != -1){
          return this.performShieldSearch(tiles, q1===1);
        }
        break;
      
      case "inns":
      case "inn":
      case "i":
        if (q.length == 1){
          return this.performInnSearch(tiles, true);
        }
        else if (q.length == 2 && (q1 = this.parseBool(q[1])) != -1){
          return this.performInnSearch(tiles, q1===1);
        }
        break;
      
      case "cathedrals":
      case "cathedral":
      case "cath":
      case "c":
        if (q.length == 1){
          return this.performCathedralSearch(tiles, true);
        }
        else if (q.length == 2 && (q1 = this.parseBool(q[1])) != -1){
          return this.performCathedralSearch(tiles, q1===1);
        }
        break;

      default:
        break;
    }
    //TODO: error
    console.log("Error: invalid search query")
    return [];
  }

  /**
   * Helper method to parse a string for anything that could be seen as a boolean value.
   * @param query - the string to parse
   * @returns 1 for true, 0 for false, -1 for error
   */
  parseBool(query:string):number{
    switch (query.toLowerCase()){
      case "true":
      case "t":
      case "yes":
      case "y":
      case "1":
      case "":
        return 1;
      case "false":
      case "f":
      case "no":
      case "n":
      case "0":
        return 0;
      default:
        //TODO:error?
        return -1;
    }
  }

  performSidesSearch(tiles: Tile[], query: string) : Tile[]{
    //TODO: implement
    // may need to validate query length? Actually maybe not, could be partial query or triangle. figure it out
    return tiles;
  }

  performMonasterySearch(tiles: Tile[], tf:boolean):Tile[] {
    for (let i = tiles.length - 1; i >= 0; i--) {
      if (tiles[i].monastery !== tf) {
        tiles.splice(i,1);
      }
    }
    return tiles;
  }

  performShieldSearch(tiles: Tile[], tf:boolean):Tile[] {
    for (let i = tiles.length - 1; i >= 0; i--) {
      if (tiles[i].shield !== tf) {
        tiles.splice(i,1);
      }
    }
    return tiles;
  }

  performCathedralSearch(tiles: Tile[], tf:boolean):Tile[] {
    var TF;
    if (!tf){
      TF = undefined;
    } else {
      TF = true;
    }
    for (let i = tiles.length - 1; i >= 0; i--) {
      if (tiles[i].cathedral != TF) {
        tiles.splice(i,1);
      }
    }
    return tiles;
  }

  performInnSearch(tiles: Tile[], tf:boolean) {
    var TF;
    if (!tf){
      TF = undefined;
    } else {
      TF = true;
    }
    for (let i = tiles.length - 1; i >= 0; i--) {
      if (tiles[i].inn != TF) {
        tiles.splice(i,1);
      }
    }
    return tiles;
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
    //TODO: - reset search
  }
}
