import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SyntaxGuideComponent } from './syntax-guide/syntax-guide.component';
import { TileDetailsPageComponent } from './tile-details-page/tile-details-page.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { ExpansionsListComponent } from './expansions-list/expansions-list.component';
import { BigSearchPageComponent } from './big-search-page/big-search-page.component';

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'syntax-guide', component: SyntaxGuideComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: 'expansions-list', component: ExpansionsListComponent },
  { path: '', component: BigSearchPageComponent},
  { path: 'tile-details/:expansion/:expId', component: TileDetailsPageComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
