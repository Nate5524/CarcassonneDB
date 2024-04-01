import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileDetailsPageComponent } from './tile-details-page.component';

describe('TileDetailsPageComponent', () => {
  let component: TileDetailsPageComponent;
  let fixture: ComponentFixture<TileDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TileDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
