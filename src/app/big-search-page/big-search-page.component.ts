import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-big-search-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './big-search-page.component.html',
  styleUrl: './big-search-page.component.css'
})
export class BigSearchPageComponent {

  constructor(private router:Router){}

  performSearch(){
    const query = (document.getElementById('search-bar') as HTMLInputElement).value;
    if (query.trim() !== '') {
      this.router.navigate(['/search', query]);
    }
  }

}
