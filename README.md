# CarcassonneDB - UNFINISHED

## Project summary
The goal of this project is to provide a useful tool for players of the board game [Carcassonne](https://wikicarpedia.com/car/Main_Page). The idea is to provide both a search engine and game tracker for tiles. It is *not* intended to in any way infringe on the copyright of the original tile/game designs. 

**This is a work in progress  - some features may be missing/incomplete at this point in time**

### Current Data
Tile images are sourced from the lists provided on [the Carcassonne game wiki](https://wikicarpedia.com/car/Main_Page). All of it was entered by hand, so if you see any errors, please let me know so I can fix them. 

The current data (as of 1/4/24) consists of data from 4 unique packs (base game c3 printing, inns and cathedrals expansion c3 printing, the river 1 expansion c2 printing, and traders & builders expansion c3 printing). These are tedious to update, but more will hopefully be added in the future, especially as my personal collection of expansions grows and more are relevant to my own play.

### Tile Search Engine
With all of the various tiles in the game, it's useful to have a way to search for certain traits. The seach engine will have functionality to search based on the features on the edges of a tile, as well as some filters based on what content the tile contains.

### Game Tracker
The more expansions in a game, the harder it is to track everything manually. The final goal for this project is to be able to "create" a game by adding the expansions a game is using. Once that has been done, tiles should be "trackable" (eg. when used, they can be marked). Since the original tile contents of the game are known, the used and unused tiles are both known if tracked properly. There should also be some support in this area for score tracking, goods tracking, and tracking of other variable game states.

## This project uses Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

Launching the project requires angular and node.js are installed on your device. Once that is true, simply run the command `ng serve` in a command line. Eventually, I hope to host this site somewhere permanent, but for now just contact me if you're curious about it and have difficulty initializing the dev version.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# TODO ITEMS
* Fully text-based searching
    * "How to" page for searching
    * "OR" in search terms
    * parentheses for order of operations
    * strings and abbreviated strings as params
    * Remove/label checkboxes
    * advanced search needs order of operations validation (ex. searching "and x" or "x or")
    * error handling for mismatched parentheses in advanced search
* New data
    * gardens (make mandatory through tile interface)
    * tile quantity (mandatory)
    * minor tile variations (non-mandatory)
* Tile information pages
* Game tracking
    * score trackers
    * resource tracking
    * game creation based on selected expansions
    * page explaining difference in C1, C2, and C3
    * tile use checking "counting cards"