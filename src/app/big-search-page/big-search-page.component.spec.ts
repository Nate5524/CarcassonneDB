import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigSearchPageComponent } from './big-search-page.component';

describe('BigSearchPageComponent', () => {
  let component: BigSearchPageComponent;
  let fixture: ComponentFixture<BigSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
