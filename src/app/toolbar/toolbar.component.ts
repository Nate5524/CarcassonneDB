import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(private router: Router) { }

  performSearch(){
    const query = (document.getElementById('search-bar') as HTMLInputElement).value;
    if (query.trim() !== '') {
      this.router.navigate(['/search', query]);
    }
  }

}
