import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-tile-details-page',
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: './tile-details-page.component.html',
  styleUrl: './tile-details-page.component.css'
})
export class TileDetailsPageComponent implements OnInit{
  sub:any;
  expansion:any;
  expId:any;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.expansion = params['expansion'];
      this.expId = params['expId'];
      });
      console.log(this.expId);
  }
}
