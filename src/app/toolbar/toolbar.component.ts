import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit{

  constructor(private router: Router) {  }

  ngOnInit(): void{
    if(this.router.url.slice(0,7) === '/search'){
      const query = decodeURIComponent(this.router.url.split('/')[2]);
      (document.getElementById('search-bar') as HTMLInputElement).value = query;
    }
  }

  performSearch(){
    const query = (document.getElementById('search-bar') as HTMLInputElement).value;
    if (query.trim() !== '') {
      this.router.navigate(['/search', query]);
    }
  }

}
