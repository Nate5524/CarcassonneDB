import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-syntax-guide',
  standalone: true,
  imports: [ToolbarComponent, RouterLink],
  templateUrl: './syntax-guide.component.html',
  styleUrl: './syntax-guide.component.css'
})

export class SyntaxGuideComponent {

}
